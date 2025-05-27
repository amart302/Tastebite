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
  async getRecipes(){
    try {
      const responce = await axios.get("http://localhost:5000/recipes");      
      return responce.data;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
      throw error;
    }
  }

  async getLatestRecipes(){
    try {
      const responce = await axios.get("http://localhost:5000/recipes");      
      return responce.data;
    } catch (error) {
      console.error("Не удалось загрузить рецепты", error);
      throw error;
    }
  }
}
