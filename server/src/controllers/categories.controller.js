import { Category } from "../models/Categories.js";

export async function getCategories(req, res){
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось загрузить категории" });
    }
}

export async function addCategories(req, res) {
    try {
        const categories = [
            { title: "Breakfast", image: "http://localhost:5000/public/images/breakfast.png" },
            { title: "Burger", image: "http://localhost:5000/public/images/burger.png" },
            { title: "Cake", image: "http://localhost:5000/public/images/cake.png" },
            { title: "Chicken", image: "http://localhost:5000/public/images/chicken.png" },
            { title: "Desserts", image: "http://localhost:5000/public/images/desserts.png" },
            { title: "Dips", image: "http://localhost:5000/public/images/dips.png" },
            { title: "Less Than 30 Min", image: "http://localhost:5000/public/images/lessThan30Min.png" },
            { title: "Meet", image: "http://localhost:5000/public/images/meet.png" },
            { title: "Pancakes", image: "http://localhost:5000/public/images/pancakes.png" },
            { title: "Pasta", image: "http://localhost:5000/public/images/pasta.png" },
            { title: "Pastries", image: "http://localhost:5000/public/images/pastries.png" },
            { title: "Pizza", image: "http://localhost:5000/public/images/pizza.png" },
            { title: "Ramen", image: "http://localhost:5000/public/images/ramen.png" },
            { title: "Salad", image: "http://localhost:5000/public/images/salad.png" },
            { title: "Sandwiches", image: "http://localhost:5000/public/images/sandwiches.png" },
            { title: "Seafood", image: "http://localhost:5000/public/images/seafood.png" },
            { title: "Smoothies", image: "http://localhost:5000/public/images/smoothies.png" },
            { title: "Soup", image: "http://localhost:5000/public/images/soup.png" },
            { title: "Vegan", image: "http://localhost:5000/public/images/vegan.png" },
            { title: "Waffles", image: "http://localhost:5000/public/images/waffles.png" }
        ];

        await Category.insertMany(categories);
        res.status(201).json({ message: "Категории успешно добавлены" });
    } catch (error) {
        console.error("Ошибка при добавлении категорий:", error);
        res.status(500).json({ 
            message: "Не удалось добавить категории",
            error: error.message 
        });
    }
}