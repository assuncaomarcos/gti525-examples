import mongoose from "mongoose";

const dishSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        veg: {
            type: Boolean,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        ingredients: [
            {
                _id: false,
                item_id: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                unit: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        directions: [
            {
                _id: false,
                step_id: {
                    type: Number,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        statics: {
            async getIngredients(dishId) {
                const dish = await this.findById(dishId);
                return dish?.ingredients;
            },
            async getDirections(dishId) {
                const dish = await this.findById(dishId);
                return dish?.directions;
            },
        }
    });

export default mongoose.model('dishes', dishSchema);