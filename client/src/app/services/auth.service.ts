import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async signUp(data: any): Promise<void>{
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw error;
    }
  }

  async signIn(data: any): Promise<void>{
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      throw error;
    }
  }
}
