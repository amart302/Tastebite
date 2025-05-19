import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoies: any;
  constructor() { }

  getCategoies(){
    try {
      this.categoies = [
        {
          _id: 1,
          image: "/assets/images/cheesecake.png",
          name: "Pasta",
        },
        {
          _id: 2,
          image: "/assets/images/cheesecake.png",
          name: "Pizza",
        },
        {
          _id: 3,
          image: "/assets/images/cheesecake.png",
          name: "Breakfast",
        },
        {
          _id: 4,
          image: "/assets/images/cheesecake.png",
          name: "Smoothies",
        },
        {
          _id: 5,
          image: "/assets/images/cheesecake.png",
          name: "Smoothies",
        },
        {
          _id: 6,
          image: "/assets/images/cheesecake.png",
          name: "Smoothies",
        },
      ];

      return this.categoies;
    } catch (error) {
      console.error("Не удалось загрузить категории", error);
    }
  }
}
