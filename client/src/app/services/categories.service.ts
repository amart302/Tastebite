import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor() { }

  getCategoies(){
    try {
      const responce = [
        {
          _id: 1,
          image: "http://localhost:5000/public/images/pasta.png",
          name: "Pasta",
        },
        {
          _id: 2,
          image: "http://localhost:5000/public/images/pizza.png",
          name: "Pizza",
        },
        {
          _id: 3,
          image: "http://localhost:5000/public/images/vegan.png",
          name: "Breakfast",
        },
        {
          _id: 4,
          image: "http://localhost:5000/public/images/desserts.png",
          name: "Smoothies",
        },
        {
          _id: 5,
          image: "http://localhost:5000/public/images/smoothies.png",
          name: "Smoothies",
        },
        {
          _id: 6,
          image: "http://localhost:5000/public/images/breakfast.png",
          name: "Smoothies",
        },
      ];

      return responce;
    } catch (error) {
      console.error("Не удалось загрузить категории", error);
      throw error;
    }
  }
}
