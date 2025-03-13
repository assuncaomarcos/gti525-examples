import mongoose from "mongoose";

export const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { _id: false });

export const multiPointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MultiPoint'],
        required: true
    },
    coordinates: {
        type: [[Number]],
        required: true
    }
}, { _id: false });

export const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        required: true
    }
}, { _id: false });

export const multiPolygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MultiPolygon'],
        required: true
    },
    coordinates: {
        type: [[[[Number]]]],
        required: true
    }
}, { _id: false });
