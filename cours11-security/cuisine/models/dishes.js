const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
        dish_id: {
            type: Number,
            required: true
        },
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
            findByDishId(dishId) {
                return this.findOne({dish_id: dishId});
            }
        }
    });

const Dishes = module.exports = mongoose.model('dishes', dishSchema);