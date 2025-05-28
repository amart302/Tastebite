import { Recipe } from "../models/Recipe.js"
import { User } from "../models/User.js";

export async function addRecipe(req, res){
    try {
        const { title,
                category,
                description,
                prepTime,
                servings,
                ingredients,
                instructions } = req.body;
        
        const { id } = req.user;
        const files = [];
        let mainImage = null;
        req.files.forEach(item => {
            if(!mainImage && item.mimetype.startsWith("image/")) mainImage = item.filename;
            files.push({
                type: item.mimetype,
                name: item.filename
            });
        });
        
        const newPost = new Recipe({
            title,
            category,
            description,
            prepTime,
            servings,
            ingredients: JSON.parse(ingredients),
            instructions: JSON.parse(instructions),
            files,
            mainImage
        });
        await newPost.save();
        
        await User.findOneAndUpdate(
            { _id: id },
            { $push: { posts: newPost._id } },
        );
        res.status(200).json({ message: "Пост успешно добавлен" });
    } catch (error) {
        res.status(500).json({ message: "Произошла ошибка при сохранении поста" });
        console.error(error);
    }
}

export async function getRecipes(req, res){
    try {
        const recipes = await Recipe.find({}, { title: 1,files: 1, rating: 1, mainImage: 1 });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при попытке получить список рецепт" });
        console.error(error);
    }
}

export async function getRecipe(req, res){
    try {
        const { id } = req.params;
        
        const recipe = await Recipe.findOne({ _id: id });
        if(!recipe) return res.status(404).json({ message: "Рецепт не найден" });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при попытке получить список рецепт" });
        console.error(error);
    }
}