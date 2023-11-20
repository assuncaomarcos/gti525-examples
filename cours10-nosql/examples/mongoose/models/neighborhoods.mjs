import mongoose from "mongoose";
import {multiPolygonSchema} from "./geojson_schemas.mjs";

const neighborhoodSchema = mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        shortCode: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        area: {
            type: multiPolygonSchema,
            index: '2dsphere'
        }
    });

export default mongoose.model('neighborhoods', neighborhoodSchema);