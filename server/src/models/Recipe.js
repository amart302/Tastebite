import mongoose from "mongoose";
const { Schema } = mongoose;

const IngredientSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
});

const FileSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }
});

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    ingredients: [IngredientSchema],
    instructions: [{ type: String, required: true }],
    rating: { type: Number, default: 5 },
    files: [FileSchema],
}, {
    timestamps: true,
    collection: "recipes"
});

export const Recipe = mongoose.model("recipes", RecipeSchema);