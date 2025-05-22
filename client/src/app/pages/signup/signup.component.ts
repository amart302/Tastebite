import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

interface FormErrors {
  fullname: string;
  email: string;
  password: string;
  general: string;
}

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  fullname: string = "";
  email: string = "";
  password: string = "";

  errors: FormErrors = {
    fullname: "",
    email: "",
    password: "",
    general: ""
  };

  isLoading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ){}

  private validateData(): boolean{
        this.errors.fullname = "";
        this.errors.email = "";
        this.errors.password = "";
        this.errors.general = "";

        let hasErrors = false;

        if(!this.fullname.trim()){
            this.errors.fullname = "Это поле обязательно для заполнения";
            hasErrors = true;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!this.email.trim()){
            this.errors.email = "Это поле обязательно для заполнения";
            hasErrors = true;
        }else if(!emailPattern.test(this.email)){
            this.errors.email = "Некорректная формат почты";
            hasErrors = true;
        }

        if(!this.password.trim()){
            this.errors.password = "Это поле обязательно для заполнения";
            hasErrors = true;
        }else if(this.password.trim().length < 6){
            this.errors.password = "Минимальная длина пароля 6 символов";
            hasErrors = true;
        }

        return hasErrors;
    };

  async handleSubmit(){
    if(this.validateData()) return;

    const data: FormData = {
      fullname: this.fullname,
      email: this.email,
      password: this.password
    };

    this.isLoading = true;
  
    try {
      await this.authService.signUp(data);
      setTimeout(() => this.router.navigate(["/"]), 600);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      if(axios.isAxiosError(error)){
        setTimeout(() => this.errors.general = error.response?.data?.message, 600);
      }
    } finally {
      setTimeout(() => this.isLoading = false, 600);
    }
  }
}
