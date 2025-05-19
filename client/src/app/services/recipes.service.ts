import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: any;
  private latestRecipes: any;
  constructor() { }

  getRecipes(){
    try {
      this.recipes = [
        {
          _id: 1,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 3
        },
        {
          _id: 2,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 5
        },
        {
          _id: 3,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 4
        },
      ];

      return this.recipes;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
    }
  }

  getLatestRecipes(){
    try {
      this.latestRecipes = [
        {
          _id: 1,
          image: "/assets/images/cheesecake.png",
          name: "Чебурек",
          rating: 3
        },
        {
          _id: 2,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 5
        },
        {
          _id: 3,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 4
        },
        {
          _id: 4,
          image: "/assets/images/cheesecake.png",
          name: "Чебурек",
          rating: 3
        },
        {
          _id: 5,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 5
        },
        {
          _id: 6,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 4
        },
        {
          _id: 7,
          image: "/assets/images/cheesecake.png",
          name: "Чебурек",
          rating: 3
        },
        {
          _id: 8,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 5
        },
        {
          _id: 9,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 4
        },
        {
          _id: 10,
          image: "/assets/images/cheesecake.png",
          name: "Чебурек",
          rating: 3
        },
        {
          _id: 11,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 5
        },
        {
          _id: 12,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 4
        },
        {
          _id: 13,
          image: "/assets/images/cheesecake.png",
          name: "Чебурек",
          rating: 3
        },
        {
          _id: 14,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 5
        },
        {
          _id: 15,
          image: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 4
        },
      ];

      return this.latestRecipes;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
    }
  }
}
