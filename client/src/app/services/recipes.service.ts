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
    } catch (error) {
      throw error;
    }
  }
  async getRecipes(): Promise<any>{
    try {
      const responce = await axios.get("http://localhost:5000/recipes");      
      return responce.data.recipes;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
      throw error;
    }
  }

  async getLatestRecipes(): Promise<any>{
    try {
      const responce = await axios.get("http://localhost:5000/recipes");      
      return responce.data.recipes;
    } catch (error) {
      console.error("Не удалось загрузить свежие рецепты", error);
      throw error;
    }
  }

  async getRecipeData(id: string | null): Promise<any>{
    try {
      const responce = await axios.get(`http://localhost:5000/recipes/${id}`)
      return responce.data.recipe;
    } catch (error) {
      console.error("Не удалось загрузить рецепт", error);
      throw error;
    }
  }
}
