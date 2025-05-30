import { Component, EventEmitter, Output } from '@angular/core';
import axios from "axios";
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

type FormData = Record<"email" | "password", string>;
type FormErrors = Record< "email" | "password" | "general", string>;

@Component({
  selector: 'app-signin',
  imports: [FormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  @Output() switchForm = new EventEmitter<void>();
  email: string = "";
  password: string = "";

  errors: FormErrors = {
    email: "",
    password: "",
    general: ""
  };

  isLoading: boolean = false;

  constructor(private authService: AuthService){}

  private validateData(): boolean{
        this.errors.email = "";
        this.errors.password = "";
        this.errors.general = "";
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let hasErrors = false;

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

  async handleSubmit(): Promise<void>{
    if(this.validateData()) return;
    const data: FormData = { 
      email: this.email,
      password: this.password
    };

    this.isLoading = true;
  
    try {
      await this.authService.signIn(data);
      window.location.reload();
    } catch (error) {
      if(axios.isAxiosError(error)){
        this.errors.general = error.response?.data?.errors[0].msg;
      }
    } finally {
      this.isLoading = false;
    }
  }
}
