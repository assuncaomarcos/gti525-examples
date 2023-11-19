import { sendJSON } from "./request.js";
import map from './map.js';

const areaSearchURL = "/api/neighborhoods/search";

const neighborLayerGroup = L.layerGroup().addTo(map);
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

map.on("draw:created", async (event) => {
    const layer = event.layer;
    const type = event.layerType;
    if (type === 'polygon') {
        drawnItems.addLayer(layer);
        await showNeighborhoods(layer);
    }
});

map.on('draw:edited', (event) => {
    const layers = event.layers;
    layers.eachLayer(async (layer) => {
        if (layer?.geoJSON) {
            neighborLayerGroup.removeLayer(layer.geoJSON);
        }
        await showNeighborhoods(layer);
    });
});

map.on('draw:deleted', (event) => {
    const layers = event.layers;
    layers.eachLayer(async (layer) => {
        if (layer?.geoJSON) {
            neighborLayerGroup.removeLayer(layer.geoJSON);
        }
    });
});

async function showNeighborhoods(polygon) {
    const coordinates = polygon.getLatLngs()[0].map(({lat, lng}) => [lng, lat]);
    let searchArea = null;
    if (coordinates?.length > 3) {
        coordinates.push(coordinates[0]); // Pour fermer le polygone.
        searchArea = { type: "Polygon", coordinates: [ coordinates ] };
    }

    if (searchArea) {
        const results = await sendJSON("post", areaSearchURL, searchArea);
        if (results && !results?.error) {
            const geoJSONLayer = L.geoJSON(results.data, {
                style: function (feature) {
                    return { weight: 1, color: '#474747'};
                }
            }).bindTooltip(function (layer) {
                return layer.feature.properties.name;
            });
            neighborLayerGroup.addLayer(geoJSONLayer);
            polygon.geoJSON = geoJSONLayer;
        }
    }
}