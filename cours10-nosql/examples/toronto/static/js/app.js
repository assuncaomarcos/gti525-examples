import { sendJSON } from "./request.js";

const areaSearchURL = "/api/neighborhoods/search";
const map = L.map('map').setView([43.6532, -79.3832], 13);

const googleStreets = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
});
googleStreets.addTo(map);

const drawnItems = new L.FeatureGroup().addTo(map);
const drawControl = new L.Control.Draw({
    draw: {
        polygon: true,
        marker: false,
        polyline: false,
        rectangle: false,
        circle: false,
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, async (event) => {
    const layer = event.layer;
    const type = event.layerType;
    drawnItems.addLayer(layer);
    if (type === 'polygon') {
        const coordinates = layer.getLatLngs()[0].map(({lat, lng}) => [lng, lat]);
        await searchNeighborhoods(coordinates);
    }
});

map.on('draw:edited', (event) => {
    const layers = event.layers;
    const type = event.layerType;
    layers.eachLayer(async (layer) => {
        if (type === 'polygon') {
            const coordinates = layer.getLatLngs()[0].map(({lat, lng}) => [lng, lat]);
            await searchNeighborhoods(coordinates);
            // console.log('Coordinates:', JSON.stringify(coordinates));
        }
    });
});

async function searchNeighborhoods(coordinates) {
    let searchArea = null;
    if (coordinates?.length > 3) {
        coordinates.push(coordinates[0]); // Pour fermer le polygone.
        searchArea = { type: "Polygon", coordinates: [ coordinates ] };
    }

    if (searchArea) {
        const results = await sendJSON("post", areaSearchURL, searchArea);
        L.geoJSON(results.data, {
            style: function (feature) {
                return { weight: 1, color: '#474747'};
            }
        }).bindPopup(function (layer) {
            return layer.feature.properties.name;
        }).addTo(map);
    }
}
