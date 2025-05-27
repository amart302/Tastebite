import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: any[] | null = null;

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
  async getRecipes(){
    try {
      if(this.recipes?.length) return this.recipes;

      const responce = await axios.get("http://localhost:5000/recipes");      
      this.recipes = responce.data;
      return this.recipes;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
      throw error;
    }
  }

  async getLatestRecipes(){
    try {
      if(this.recipes?.length) return this.recipes;
      
      const responce = await axios.get("http://localhost:5000/recipes");      
      this.recipes = responce.data;
      return this.recipes;
    } catch (error) {
      console.error("Не удалось загрузить свежие рецепты", error);
      throw error;
    }
  }
}
