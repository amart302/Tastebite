import { Recipe } from "../models/Recipe.js"
import { User } from "../models/User.js";
import { deleteFilesByName } from "../utils/fileUtils.js";

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
            mainImage,
            author: id
        });
        await newPost.save();
        
        await User.findOneAndUpdate(
            { _id: id },
            { $push: { posts: newPost._id } },
        );
        res.status(200).json({ success: true, message: "Рецепт успешно добавлен" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Не удалось сохранить рецепт" });
        console.error(error);
    }
}

export async function getRecipes(req, res){
    try {
        const recipes = await Recipe.find({}, { title: 1,files: 1, rating: 1, mainImage: 1 });
        res.status(200).json({ success: true, recipes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Не удалось загрузить рецепты" });
        console.error(error);
    }
}

export async function getRecipe(req, res){
    try {
        const { id } = req.params;
        
        const recipe = await Recipe.findOne({ _id: id }).populate({
            path: "author",
            select: "fullname avatar"
        });
        
        if(!recipe) return res.status(404).json({ message: "Рецепт не найден" });
        res.status(200).json({ success: true, recipe });
    } catch (error) {
        res.status(500).json({ success: false, message: "Не удалось загрузить рецепт" });
        console.error(error);
    }
}

export async function deleteRecipe(req, res){
    try {
        const { id } = req.params;
        const recipe = await Recipe.findOne({ _id: id });
        if(!recipe){
            return res.status(404).json({ success: false, message: "Рецепт не найден" });
        }
        await deleteFilesByName(null, recipe.files);
        await Recipe.findOneAndDelete({ _id: id });
        res.status(200).json({ success: true, message: "Пост успешно удален" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Не удалось удалить пост" });
        console.error(error);
    }
}