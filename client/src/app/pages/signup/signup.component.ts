import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  fullnameError: string = "";
  emailError: string = "";
  passwordError: string = "";
  generalError: string = "";
  isLoading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ){}

  validateData(){
        this.fullnameError = "";
        this.emailError = "";
        this.passwordError = "";
        this.generalError = "";
        if(!this.fullname.trim()){
            this.fullnameError = "Это поле обязательно для заполнения";
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!this.email.trim()){
            this.emailError = "Это поле обязательно для заполнения";
        }else if(!emailPattern.test(this.email)){
            this.emailError = "Некорректная формат почты";
        }

        if(!this.password.trim()){
            this.passwordError = "Это поле обязательно для заполнения";
        }else if(this.password.trim().length < 6){
            this.passwordError = "Минимальная длина пароля 6 символов";
        }
    };

  async handleSubmit(){
    this.validateData();
    if(this.generalError || this.emailError || this.passwordError) return;
    const data = {
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
        setTimeout(() => this.generalError = error.response?.data?.message, 600);
      }
    } finally {
      setTimeout(() => this.isLoading = false, 600);
    }
  }
}
