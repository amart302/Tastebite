import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router) { }

  async getUserAvatar(): Promise<any>{
    try {
      const token: string | null = localStorage.getItem("token");

      if(!token){
        console.log("Пользователь не авторизаван");
        return;
      }
      const responce = await axios.get("http://localhost:5000/user/avatar", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return responce.data.avatar;
    } catch (error) {
      this.router.navigate(["/signin"]);
      throw error;
    }
  }

  async getUserData(): Promise<any>{
    try {
      const token: string | null = localStorage.getItem("token");

      if(!token){
        console.log("Пользователь не авторизаван");
        return;
      }
      const response = await axios.get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      this.router.navigate(["/signin"])
      throw error;
    }
  }
}
