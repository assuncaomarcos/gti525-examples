import { fetchData } from "./request.js";
import map from './map.js';

const siteSearchURL = "/api/sites";

const distanceSlider = document.getElementById('distance');
M.Range.init(distanceSlider, {
    showValue: true
});

distanceSlider.addEventListener("change", async () => {
    const layers = drawnItems.getLayers();
    if (layers.length > 0) {
        siteLayerGroup.clearLayers();
        const marker = layers[0];
        await showSites(marker);
    }
});

const siteLayerGroup = L.layerGroup().addTo(map);
const drawnItems = new L.FeatureGroup().addTo(map);
const drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
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
    siteLayerGroup.clearLayers();
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);
    await showSites(layer);
});

map.on('draw:edited', (event) => {
    const layers = event.layers;
    layers.eachLayer(async (layer) => {
        if (layer?.geoJSON) {
            siteLayerGroup.removeLayer(layer.geoJSON);
        }
        await showSites(layer);
    });
});

map.on('draw:deleted', (event) => {
    const layers = event.layers;
    layers.eachLayer(async (layer) => {
        if (layer?.geoJSON) {
            siteLayerGroup.removeLayer(layer.geoJSON);
        }
    });
});

async function showSites(marker) {
    const location = marker.getLatLng();
    const distance = distanceSlider.value;
    const url = `${siteSearchURL}/?location=${location.lng},${location.lat}&distance=${distance}`;
    const results = await fetchData(url);
    if (results && !results?.error) {
        const geoJSONLayer = L.geoJSON(results.data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.name) {
                    layer.bindTooltip(feature.properties.name);
                }
            }
        });
        siteLayerGroup.addLayer(geoJSONLayer);
        marker.geoJSON = geoJSONLayer;
    }
}