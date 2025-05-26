import mongoose from "mongoose";
const { Schema } = mongoose;

const IngredientSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
});

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    ingredients: [IngredientSchema],
    instructions: [{ type: String, required: true }],
    files: [{ type: String, required: true }],
}, {
    timestamps: true,
    collection: "users"
});

export const Recipe = mongoose.model("recipes", RecipeSchema);