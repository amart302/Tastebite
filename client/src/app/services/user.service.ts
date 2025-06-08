import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  async getUserAvatar(): Promise<any>{
    try {
      const token: string | null = localStorage.getItem("token");

      if(!token){
        return;
      }
      const responce = await axios.get("http://localhost:5000/user/avatar", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      localStorage.setItem("userId", responce.data.user._id);
      return responce.data.user.avatar;
    } catch (error) {
      localStorage.clear();
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

      return response.data.user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserData(data: any): Promise<any>{
    try {
      const token: string | null = localStorage.getItem("token");
      if(!token){
        console.log("Пользователь не авторизаван");
        return;
      }
      await axios.patch("http://localhost:5000/user", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(): Promise<void>{
    try {
      const token: string | null = localStorage.getItem("token");
      if(!token){
        console.log("Пользователь не авторизаван");
        return;
      }

      await axios.delete("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
