import mongoose from "mongoose";
const { Schema } = mongoose;

const IngredientSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
}, { _id: false });

const FileSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }
}, { _id: false });

const Comment = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true }
});

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: Number, required: true },
    servings: { type: Number },
    ingredients: [IngredientSchema],
    instructions: [{ type: String, required: true }],
    rating: { type: Number, default: 5 },
    files: [FileSchema],
    mainImage: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [Comment]
}, {
    timestamps: true,
    collection: "recipes"
});

export const Recipe = mongoose.model("Recipe", RecipeSchema);