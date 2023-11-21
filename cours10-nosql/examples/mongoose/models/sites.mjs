import mongoose from "mongoose";
import {multiPointSchema} from "./geojson_schemas.mjs";

const siteSchema = mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: true
        },
        location: {
            type: multiPointSchema,
            index: '2dsphere'
        }
    },
    {
        statics: {
            async withinArea(longitude, latitude, maxDistance) {
                return this.find({
                    location: {
                        $nearSphere: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                            $maxDistance: maxDistance
                        }
                    }
                });
            }
        }
    }
    );

export default mongoose.model('sites', siteSchema);