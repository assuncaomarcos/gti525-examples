const map = L.map('map').setView([43.6532, -79.3832], 13);
const googleStreets = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
});
googleStreets.addTo(map);

export default map;