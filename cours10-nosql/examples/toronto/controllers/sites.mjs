import Format from 'response-format';
import sites from "../models/sites.mjs";
import GeoJSON from 'geojson';

class SitesController {

    async search(req, res) {
        try {
            const {coordinates, location, distance} = req.query;

            if (location) {
                const point = parseLocation(location);
                const maxDistance = parseInt(distance);
                if (maxDistance) {
                    const results = await sites.withinArea(point.longitude, point.latitude, maxDistance);
                    const geoJSON = GeoJSON.parse(results, {GeoJSON: 'location'});
                    return res.json(Format.success("OK", geoJSON));
                } else {
                    return res.json(Format.badRequest("Valeur de distance maximale invalide: " + distance));
                }
            }
            const results = await sites.all(coordinates === "true");
            return res.json(Format.success("OK", results));
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }

    async byId(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await sites.findById(id);
            if (result) {
                res.json(Format.success("OK", result));
            } else {
                res.json(Format.notFound("Site pas trouvé."));
            }
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }

    async withinPolygon(req, res) {
        const searchArea = req.body;
        try {
            const results = await sites.withinPolygon(searchArea);
            const geoJSON = GeoJSON.parse(results, {GeoJSON: 'location'});
            res.json(Format.success("OK", geoJSON));
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }
}

function parseLocation(locationString) {
    const coordinates = locationString.split(',');

    if (coordinates.length !== 2) {
        throw new Error("Location doit contenir la longitude et la latitude séparées par une virgule.");
    }

    const longitude = parseFloat(coordinates[0]);
    const latitude = parseFloat(coordinates[1]);

    if (isNaN(longitude) || isNaN(latitude)) {
        throw new Error("Veuillez fournir des valeurs numériques pour longitude et latitude.");
    }

    return {
        longitude,
        latitude
    };
}

export default new SitesController();

