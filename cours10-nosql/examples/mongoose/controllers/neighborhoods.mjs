import Format from 'response-format';
import neighborhoods from "../models/neighborhoods.mjs";
import GeoJSON from 'geojson';

class NeighborhoodsController {

    async all(req, res) {
        try {
            const results = await neighborhoods.find({}).select({area: 0});
            res.json(Format.success("OK", results));
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }

    async byId(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await neighborhoods.findOne({ _id : id });
            if (result) {
                res.json(Format.success("OK", result));
            } else {
                res.json(Format.notFound("Arrondissement pas trouvé."));
            }
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }
    async withinArea(req, res) {
        const searchArea = req.body;
        try {
            const results = await neighborhoods.find().where('area').within(searchArea);
            const geoJSON = GeoJSON.parse(results, {GeoJSON: 'area'});
            res.json(Format.success("OK", geoJSON));
        } catch (error) {
            res.json(Format.badRequest("Mauvaise requête: " + error.message));
        }
    }
}

export default new NeighborhoodsController();