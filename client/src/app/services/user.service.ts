import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router) { }

  async getUserAvatar(token: string): Promise<any>{
    try {
      const responce = await axios.get("http://localhost:5000/user/avatar", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return responce;
    } catch (error) {
      this.router.navigate(["/signin"]);
      throw error;
    }
  }

  async getUserData(token: string | null): Promise<any>{
    try {
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
