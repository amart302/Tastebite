import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor() { }

  async addRecipe(data: any): Promise<void>{
    try {
      const token: string | null = localStorage.getItem("token");

      const responce = await axios.post("http://localhost:5000/recipes/additem", data,  {
        headers: {
          Authorization: `Bearer ${token}`,
          
        }
      });
      console.log(responce);
      
    } catch (error) {
      throw error;
    }
  }
  getRecipes(){
    try {
      const responce = [
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a1",
          title: "Spinach and Cheese Pasta",
          category: "Pasta",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a2",
          title: "Fancy Glazed Donuts",
          category: "Dessert",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a3",
          title: "Mighty Cheesy Breakfast Burger",
          category: "Burger",
          image: "/assets/images/cheesecake.png",
          rating: 3
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a4",
          title: "Sweet Tooth",
          category: "Dessert",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a5",
          title: "Caramel Strawberry Milkshake",
          category: "Drink",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a6",
          title: "Chocolate and Banana Jar Cake",
          category: "Dessert",
          image: "/assets/images/cheesecake.png",
          rating: 5
        }
      ];

      return responce;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
      throw error;
    }
  }

  getLatestRecipes(){
    try {
      const responce = [
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a1",
          title: "Spinach and Cheese Pasta",
          category: "Pasta",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a2",
          title: "Fancy Glazed Donuts",
          category: "Dessert",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a3",
          title: "Mighty Cheesy Breakfast Burger",
          category: "Burger",
          image: "/assets/images/cheesecake.png",
          rating: 3
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a4",
          title: "Sweet Tooth",
          category: "Dessert",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a5",
          title: "Caramel Strawberry Milkshake",
          category: "Drink",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a6",
          title: "Chocolate and Banana Jar Cake",
          category: "Dessert",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a8",
          title: "Truffle Mushroom Risotto",
          category: "Pasta",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5a9",
          title: "Crispy Chicken Wings",
          category: "Appetizer",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b0",
          title: "Avocado Toast",
          category: "Breakfast",
          image: "/assets/images/cheesecake.png",
          rating: 3
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b1",
          title: "Classic Margherita Pizza",
          category: "Pizza",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b2",
          title: "Beef Taco Plate",
          category: "Mexican",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b3",
          title: "Rainbow Veggie Salad",
          category: "Salad",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b4",
          title: "Honey Glazed Salmon",
          category: "Seafood",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b5",
          title: "Garlic Butter Shrimp Pasta",
          category: "Pasta",
          image: "/assets/images/cheesecake.png",
          rating: 4
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b6",
          title: "Chocolate Lava Cake",
          category: "Dessert",
          image: "/assets/images/cheesecake.png",
          rating: 5
        },
        {
          _id: "65a8f1b2e4d1f3a9c7d3e5b7",
          title: "Iced Matcha Latte",
          category: "Drink",
          image: "/assets/images/cheesecake.png",
          rating: 4
        }
      ];

      return responce;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
      throw error;
    }
  }
}
