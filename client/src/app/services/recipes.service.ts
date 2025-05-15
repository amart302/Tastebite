import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: any = [];
  constructor() { }

  getRecipes(){
    try {
      this.recipes = [
        {
          _id: 1,
          poster: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 3
        },
        {
          _id: 2,
          poster: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 5
        },
        {
          _id: 3,
          poster: "/assets/images/cheesecake.png",
          name: "Cheesecake",
          rating: 4
        },
      ];
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
    }
  }
}
