import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor() { }

  async getCategoies(){
    try {
      const responce = await axios.get("http://localhost:5000/categories/");
      return responce.data;
    } catch (error) {
      console.error("Не удалось загрузить категории", error);
      throw error;
    }
  }

  async getPopularCategoies(){
    try {
      const responce = await axios.get("http://localhost:5000/categories/");
      return responce.data.slice(0, 6);
    } catch (error) {
      throw error;
    }
  }
}
