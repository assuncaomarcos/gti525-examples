import model from '../models/artists.mjs';
import { AbstractController, Response } from "./abstract.mjs";

class ArtistsController extends AbstractController {

    async all(req, res) {
        const page = super.currentPage(req);
        const pageSize = super.getPageSize(req);
        try {
            const count = await model.count();
            const results = await model.all(page, pageSize);
            let links = super.createLinks(req, count, page, pageSize);
            res.json(Response.ok(results, count, links));
        } catch (error) {
            res.status(505);
        }
    }

    async artistById(req, res) {
        const artistId = req?.params?.artistId;
        if (artistId) {
            const result = await model.artistById(parseInt(artistId));
            if (result) {
                return res.json(Response.ok(result));
            }
        }
        res.json(Response.notFound("Artiste introuvable."));
    }
}

export default new ArtistsController();