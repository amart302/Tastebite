import { Component, Output, EventEmitter } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

type FormData = Record<"fullname" | "email" | "password", string>
type FormErrors = Record<"fullname" | "email" | "password" | "confirmPassword" | "general", string>

@Component({
  selector: 'app-signup',
  imports: [FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @Output() switchForm = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>();
  fullname: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  errors: FormErrors = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  };

  isLoading: boolean = false;

  constructor(private authService: AuthService){}

  private validateData(): boolean{
        this.errors.fullname = "";
        this.errors.email = "";
        this.errors.password = "";
        this.errors.confirmPassword = "";
        this.errors.general = "";

        let hasErrors = false;

        if(!this.fullname.trim()){
            this.errors.fullname = "Это поле обязательно для заполнения";
            hasErrors = true;
        }else if(this.fullname.trim().length > 150){
            this.errors.fullname = "Максимальная длина 150 символов";
            hasErrors = true;
        }
        
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!this.email.trim()){
            this.errors.email = "Это поле обязательно для заполнения";
            hasErrors = true;
        }else if(!emailPattern.test(this.email)){
            this.errors.email = "Некорректная формат почты";
            hasErrors = true;
        }else if(this.email.trim().length > 150){
            this.errors.email = "Максимальная длина 150 символов";
            hasErrors = true;
        }

        if(!this.password.trim()){
            this.errors.password = "Это поле обязательно для заполнения";
            hasErrors = true;
        }else if(this.password.trim().length < 6){
            this.errors.password = "Минимальная длина пароля 6 символов";
            hasErrors = true;
        }else if(this.password.trim().length > 150){
            this.errors.password = "Максимальная длина пароля 150 символов";
            hasErrors = true;
        }

        if(!this.confirmPassword.trim()){
            this.errors.confirmPassword = "Это поле обязательно для заполнения";
            hasErrors = true;
        }else if(this.confirmPassword.trim().length < 6){
            this.errors.confirmPassword = "Минимальная длина пароля 6 символов";
            hasErrors = true;
        }else if(this.confirmPassword.trim().length > 150){
            this.errors.confirmPassword = "Максимальная длина пароля 150 символов";
            hasErrors = true;
        }

        if(this.password.trim() !== this.confirmPassword.trim()){
          this.errors.general = "Пароли не совпадают";
          hasErrors = true;
        }

        return hasErrors;
    };

  async handleSubmit(): Promise<void>{
    if(this.validateData()) return;

    const data: FormData = {
      fullname: this.fullname,
      email: this.email,
      password: this.password
    };

    this.isLoading = true;
  
    try {
      await this.authService.signUp(data);
      window.location.reload();
    } catch (error) {
      if(axios.isAxiosError(error)){
        this.errors.general = error.response?.data?.message || error.response?.data?.errors[0].msg;
      }
    } finally {
      this.isLoading = false;
    }
  }
}
