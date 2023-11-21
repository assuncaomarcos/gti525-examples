import Format from 'response-format';
import sites from "../models/sites.mjs";

class SitesController {

    async search(req, res) {
        try {
            const {location, distance} = req.query;

            if (location) {
                const point = parseLocation(location);
                const maxDistance = parseInt(distance);
                if (maxDistance) {
                    const results = await sites.withinArea(point.longitude, point.latitude, maxDistance);
                    const geoJSON = new SiteCollection(results);
                    return res.json(Format.success("OK", geoJSON));
                } else {
                    return res.json(Format.badRequest("Valeur de distance maximale invalide: " + distance));
                }
            }
            const results = await sites.find().select({location: 0});
            return res.json(Format.success("OK", results));
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }

    async byId(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await sites.findOne({ _id : id });
            if (result) {
                res.json(Format.success("OK", result));
            } else {
                res.json(Format.notFound("Arrondissement pas trouvé."));
            }
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }
}

class SiteCollection {

    constructor(sites) {
        this.type = "FeatureCollection";
        this.crs = { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } };
        this.features = [];
        if (sites && sites?.length > 0) {
            this.addFeatures(sites);
        }
    }

    addFeatures(sites) {
        sites.forEach(site => {
            const {_id, name, category, website, location } = site;
            const properties = {_id, name, category, website};
            const geometry = location;
            this.features.push({type: "Feature", properties, geometry})
        });
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