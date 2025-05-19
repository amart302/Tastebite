import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: any;
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
}
