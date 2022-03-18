'use strict';

/**
 * Defines an instance of the Locator+ solution, to be instantiated
 * when the Maps library is loaded.
 */
function LocatorPlus(configuration) {
const locator = this;

locator.locations = configuration.locations || [];
locator.capabilities = configuration.capabilities || {};

const mapEl = document.getElementById('map');
const panelEl = document.getElementById('locations-panel');
locator.panelListEl = document.getElementById('locations-panel-list');
const sectionNameEl =
    document.getElementById('location-results-section-name');
const resultsContainerEl = document.getElementById('location-results-list');

const itemsTemplate = Handlebars.compile(
    document.getElementById('locator-result-items-tmpl').innerHTML);

locator.searchLocation = null;
locator.searchLocationMarker = null;
locator.selectedLocationIdx = null;
locator.userCountry = null;

// Initialize the map -------------------------------------------------------
locator.map = new google.maps.Map(mapEl, configuration.mapOptions);

// Store selection.
const selectResultItem = function(locationIdx, panToMarker, scrollToResult) {
    locator.selectedLocationIdx = locationIdx;
    for (let locationElem of resultsContainerEl.children) {
    locationElem.classList.remove('selected');
    if (getResultIndex(locationElem) === locator.selectedLocationIdx) {
        locationElem.classList.add('selected');
        if (scrollToResult) {
        panelEl.scrollTop = locationElem.offsetTop;
        }
    }
    }
    if (panToMarker && (locationIdx != null)) {
    locator.map.panTo(locator.locations[locationIdx].coords);
    }
};

// Create a marker for each location.
const markers = locator.locations.map(function(location, index) {
    const marker = new google.maps.Marker({
    position: location.coords,
    map: locator.map,
    title: location.title,
    });
    marker.addListener('click', function() {
    selectResultItem(index, false, true);
    });
    return marker;
});

// Fit map to marker bounds.
locator.updateBounds = function() {
    const bounds = new google.maps.LatLngBounds();
    if (locator.searchLocationMarker) {
    bounds.extend(locator.searchLocationMarker.getPosition());
    }
    for (let i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
    }
    locator.map.fitBounds(bounds);
};
if (locator.locations.length) {
    locator.updateBounds();
}

// Get the distance of a store location to the user's location,
// used in sorting the list.
const getLocationDistance = function(location) {
    if (!locator.searchLocation) return null;

    // Use travel distance if available (from Distance Matrix).
    if (location.travelDistanceValue != null) {
    return location.travelDistanceValue;
    }

    // Fall back to straight-line distance.
    return google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(location.coords),
        locator.searchLocation.location);
};

// Render the results list --------------------------------------------------
const getResultIndex = function(elem) {
    return parseInt(elem.getAttribute('data-location-index'));
};

locator.renderResultsList = function() {
    let locations = locator.locations.slice();
    for (let i = 0; i < locations.length; i++) {
    locations[i].index = i;
    }
    if (locator.searchLocation) {
    sectionNameEl.textContent =
        'Pontos de estoque mais próximos (' + locations.length + ')';
    locations.sort(function(a, b) {
        return getLocationDistance(a) - getLocationDistance(b);
    });
    } else {
    sectionNameEl.textContent = `Todos os pontos com estoque (${locations.length})`;
    }
    const resultItemContext = { locations: locations };
    resultsContainerEl.innerHTML = itemsTemplate(resultItemContext);
    for (let item of resultsContainerEl.children) {
    const resultIndex = getResultIndex(item);
    if (resultIndex === locator.selectedLocationIdx) {
        item.classList.add('selected');
    }

    const resultSelectionHandler = function() {
        selectResultItem(resultIndex, true, false);
    };

    // Clicking anywhere on the item selects this location.
    // Additionally, create a button element to make this behavior
    // accessible under tab navigation.
    item.addEventListener('click', resultSelectionHandler);
    item.querySelector('.select-location')
        .addEventListener('click', function(e) {
            resultSelectionHandler();
            e.stopPropagation();
        });
    }
};

// Optional capability initialization --------------------------------------
initializeSearchInput(locator);
initializeDistanceMatrix(locator);

// Initial render of results -----------------------------------------------
locator.renderResultsList();
}

/** When the search input capability is enabled, initialize it. */
function initializeSearchInput(locator) {
const geocodeCache = new Map();
const geocoder = new google.maps.Geocoder();

const searchInputEl = document.getElementById('location-search-input');
const searchButtonEl = document.getElementById('location-search-button');

const updateSearchLocation = function(address, location) {
    if (locator.searchLocationMarker) {
    locator.searchLocationMarker.setMap(null);
    }
    if (!location) {
    locator.searchLocation = null;
    return;
    }
    locator.searchLocation = {'address': address, 'location': location};
    locator.searchLocationMarker = new google.maps.Marker({
    position: location,
    map: locator.map,
    title: 'Minha localização',
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#3367D6',
        fillOpacity: 0.5,
        strokeOpacity: 0,
    }
    });

    // Update the locator's idea of the user's country, used for units. Use
    // `formatted_address` instead of the more structured `address_components`
    // to avoid an additional billed call.
    const addressParts = address.split(' ');
    locator.userCountry = addressParts[addressParts.length - 1];

    // Update map bounds to include the new location marker.
    locator.updateBounds();

    // Update the result list so we can sort it by proximity.
    locator.renderResultsList();

    locator.updateTravelTimes();
};

const geocodeSearch = function(query) {
    if (!query) {
    return;
    }

    const handleResult = function(geocodeResult) {
    searchInputEl.value = geocodeResult.formatted_address;
    updateSearchLocation(
        geocodeResult.formatted_address, geocodeResult.geometry.location);
    };

    if (geocodeCache.has(query)) {
    handleResult(geocodeCache.get(query));
    return;
    }
    const request = {address: query, bounds: locator.map.getBounds()};
    geocoder.geocode(request, function(results, status) {
    if (status === 'OK') {
        if (results.length > 0) {
        const result = results[0];
        geocodeCache.set(query, result);
        handleResult(result);
        }
    }
    });
};

// Set up geocoding on the search input.
searchButtonEl.addEventListener('click', function() {
    geocodeSearch(searchInputEl.value.trim());
});

// Initialize Autocomplete.
initializeSearchInputAutocomplete(
    locator, searchInputEl, geocodeSearch, updateSearchLocation);
}

/** Add Autocomplete to the search input. */
function initializeSearchInputAutocomplete(
    locator, searchInputEl, fallbackSearch, searchLocationUpdater) {
// Set up Autocomplete on the search input. Bias results to map viewport.
const autocomplete = new google.maps.places.Autocomplete(searchInputEl, {
    types: ['geocode'],
    fields: ['place_id', 'formatted_address', 'geometry.location']
});
autocomplete.bindTo('bounds', locator.map);
autocomplete.addListener('place_changed', function() {
    const placeResult = autocomplete.getPlace();
    if (!placeResult.geometry) {
    // Hitting 'Enter' without selecting a suggestion will result in a
    // placeResult with only the text input value as the 'name' field.
    fallbackSearch(placeResult.name);
    return;
    }
    searchLocationUpdater(
        placeResult.formatted_address, placeResult.geometry.location);
});
}

/** Initialize Distance Matrix for the locator. */
function initializeDistanceMatrix(locator) {
const distanceMatrixService = new google.maps.DistanceMatrixService();

// Annotate travel times to the selected location using Distance Matrix.
locator.updateTravelTimes = function() {
    if (!locator.searchLocation) return;

    const units = (locator.userCountry === 'USA') ?
        google.maps.UnitSystem.IMPERIAL :
        google.maps.UnitSystem.METRIC;
    const request = {
    origins: [locator.searchLocation.location],
    destinations: locator.locations.map(function(x) {
        return x.coords;
    }),
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: units,
    };
    const callback = function(response, status) {
    if (status === 'OK') {
        const distances = response.rows[0].elements;
        for (let i = 0; i < distances.length; i++) {
        const distResult = distances[i];
        let travelDistanceText, travelDistanceValue;
        if (distResult.status === 'OK') {
            travelDistanceText = distResult.distance.text;
            travelDistanceValue = distResult.distance.value;
        }
        const location = locator.locations[i];
        location.travelDistanceText = travelDistanceText;
        location.travelDistanceValue = travelDistanceValue;
        }

        // Re-render the results list, in case the ordering has changed.
        locator.renderResultsList();
    }
    };
    distanceMatrixService.getDistanceMatrix(request, callback);
};
}

function initMap() {
    new LocatorPlus(CONFIGURATION);
} 

let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))
console.log("stockPoints",stockPoints);

const CONFIGURATION = {
    "locations": stockPoints.map(function(stockPoints){
        return {
            "title":`${stockPoints.bairro}`,
            "address1":`${stockPoints.logradouro}`,
            "address2":`${stockPoints.numero}, ${stockPoints.numero} - ${stockPoints.localidade} - SC, ${stockPoints.cep}`,
            "coords":{"lat":38.0, "lng":38.0},
            "mapOptions": {"center":{"lat":38.0,"lng":-100.0},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":false,"zoom":4,"zoomControl":true,"maxZoom":17},
            "mapsApiKey": "AIzaSyCzYaZQlUdq9fnIyOzwpaS3rYLWruOPqaQ"
        }
    })    
};


// google.maps.event.addDomListener(window, 'load', initialize);
// function initialize() {
// var autocomplete = new google.maps.places.Autocomplete(input);
// autocomplete.addListener('place_changed', function () {
// var place = autocomplete.getPlace();
// // place variable will have all the information you are looking for.
 
//   document.getElementById("latitude").value = place.geometry['location'].lat();
//   document.getElementById("longitude").value = place.geometry['location'].lng();
// });
// }

// const CONFIGURATION = {
// "locations": [
//     {"title":"Recicla Futuro","address1":"R. Dep. Antônio Edu Vieira","address2":"46 - Pantanal, Florianópolis - SC, 88040-000, Brasil","coords":{"lat":-27.613483273777113,"lng":-48.52663053558198},"placeId":"ChIJsbltAqU5J5URwn5n--IoZ-8"},
//     {"title":"Ecoponto Comcap","address1":"R. Prof. Egídio Ferreira","address2":"1817 - Capoeiras, Florianópolis - SC, 88090-500, Brasil","coords":{"lat":-27.596381700071834,"lng":-48.603646871302786},"placeId":"ElNSLiBQcm9mLiBFZ8OtZGlvIEZlcnJlaXJhLCAxODE3IC0gQ2Fwb2VpcmFzLCBGbG9yaWFuw7Nwb2xpcyAtIFNDLCA4ODA5MC01MDAsIEJyYXppbCJREk8KNAoyCWtA4zssNieVEWryZancK4aUGh4LEO7B7qEBGhQKEgnx0i781EknlRFNbJFpPf6N4gwQmQ4qFAoSCaGDT0wqNieVEa-s1wM9qfOA"},
//     {"title":"Ecoponto Comcap Morro das Pedras","address1":"R. Francisco Viêira","address2":"198 - Morro das Pedras, Florianópolis - SC, 88066-010, Brasil","coords":{"lat":-27.70646768049001,"lng":-48.50507397843476},"placeId":"ChIJ-31ztzM7J5URRbktztgJoGI"},
//     {"title":"SOS Entulho","address1":"R. Joaquim Carneiro","address2":"989 - Capoeiras, Florianópolis - SC, 88085-157, Brasil","coords":{"lat":-27.605099804599966,"lng":-48.5910750588955},"placeId":"ChIJfRU0LMg3J5UR5lHNccft0Fw"},
//     {"title":"Brasil Atacadista","address1":"Estrada - Rod. Armando Calil Bulos","address2":"5890 - Ingleses Centro, Florianópolis - SC, 88058-001, Brasil","coords":{"lat":-27.43808849023087,"lng":-48.40311773558195},"placeId":"ChIJ-aADcQFCJ5URZXh92s2l50g"},
//     {"title":"Angeloni Ingleses","address1":"Rodovia - SC-403","address2":"6375 - Ingleses Norte, Florianópolis - SC, 88058-001, Brasil","coords":{"lat":-27.437202756489516,"lng":-48.3982270067459},"placeId":"ChIJnTry0f9pJ5UR6FZDVVps00w"},
//     {"title":"Angeloni Centro","address1":"R. Esteves Júnior","address2":"307 - Centro, Florianópolis - SC, 88015-130, Brasil","coords":{"lat":-27.59199113921723,"lng":-48.55312689140168},"placeId":"ChIJfZ8KBiI4J5URW8yltidLYHY"},
//     {"title":"CS Entulhos","address1":"Rod. Tertuliano Brito Xavier","address2":"967 - Canasvieiras, Florianópolis - SC, 88054-600, Brasil","coords":{"lat":-27.434920713912685,"lng":-48.46696216441802},"placeId":"ChIJtzA8nZpDJ5UReZvWFet1M_8"},
//     {"title":"Floripa Shopping","address1":"SC-401","address2":"3116 - Saco Grande, Florianópolis - SC, 88032-005, Brasil","coords":{"lat":-27.55403016050506,"lng":-48.498512606745905},"placeId":"ChIJFUcjnVBBJ5URzBrQOJNN8UA"},
//     {"title":"Centro Integrado de Atendimento ao Cidadão – CIAC","address1":"R. Crisógono Viêira da Cruz - Lagoa da Conceição","address2":"Florianópolis - SC, 88062-110, Brasil","coords":{"lat":-27.60306599423719,"lng":-48.47060243187713},"placeId":"ChIJ_cwBr7c-J5URSdklyCbnpJ0"}
// ],
// "mapOptions": {"center":{"lat":38.0,"lng":-100.0},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":false,"zoom":4,"zoomControl":true,"maxZoom":17},
// "mapsApiKey": "AIzaSyCzYaZQlUdq9fnIyOzwpaS3rYLWruOPqaQ"
// };

// function initMap() {
// new LocatorPlus(CONFIGURATION);
// } marker 
