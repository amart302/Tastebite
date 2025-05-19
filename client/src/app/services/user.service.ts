import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  async getUserAvatar(token: string){
    try {
      const responce = await axios.get("http://localhost:5000/user/avatar", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return responce;
    } catch (error) {
      throw error;
    }
  }
}
