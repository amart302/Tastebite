import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: false,
    collection: "categories"
});


export const Category = mongoose.model("Category", CategorySchema);