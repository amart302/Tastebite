import { Category } from "../models/Categories.js";

export async function getCategories(req, res){
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ошибка при попытке получить список категорий" });
    }
}

export async function addCategories(req, res) {
    try {
        const categories = [
            { title: "breakfast", image: "http://localhost:5000/public/images/breakfast.png" },
            { title: "burger", image: "http://localhost:5000/public/images/burger.png" },
            { title: "cake", image: "http://localhost:5000/public/images/cake.png" },
            { title: "chicken", image: "http://localhost:5000/public/images/chicken.png" },
            { title: "desserts", image: "http://localhost:5000/public/images/desserts.png" },
            { title: "dips", image: "http://localhost:5000/public/images/dips.png" },
            { title: "lessThan30Min", image: "http://localhost:5000/public/images/lessThan30Min.png" },
            { title: "meet", image: "http://localhost:5000/public/images/meet.png" },
            { title: "pancakes", image: "http://localhost:5000/public/images/pancakes.png" },
            { title: "pasta", image: "http://localhost:5000/public/images/pasta.png" },
            { title: "pastries", image: "http://localhost:5000/public/images/pastries.png" },
            { title: "pizza", image: "http://localhost:5000/public/images/pizza.png" },
            { title: "ramen", image: "http://localhost:5000/public/images/ramen.png" },
            { title: "salad", image: "http://localhost:5000/public/images/salad.png" },
            { title: "sandwiches", image: "http://localhost:5000/public/images/sandwiches.png" },
            { title: "seafood", image: "http://localhost:5000/public/images/seafood.png" },
            { title: "smoothies", image: "http://localhost:5000/public/images/smoothies.png" },
            { title: "soup", image: "http://localhost:5000/public/images/soup.png" },
            { title: "vegan", image: "http://localhost:5000/public/images/vegan.png" },
            { title: "waffles", image: "http://localhost:5000/public/images/waffles.png" }
        ];

        const result = await Category.insertMany(categories);

        res.status(201).json({ message: "Категории успешно добавлены" });
    } catch (error) {
        console.error("Ошибка при добавлении категорий:", error);
        res.status(500).json({ 
            message: "Ошибка при попытке добавить категории",
            error: error.message 
        });
    }
}