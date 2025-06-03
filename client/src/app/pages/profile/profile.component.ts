import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { RecipeCardsComponent } from '../../components/recipe-cards/recipe-cards.component';
import { NgIf } from '@angular/common';
import axios from 'axios';

type FormErrors = Record<"fullname" | "email" | "password" | "confirmPassword" | "general", string>

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent, FormsModule, RecipeCardsComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  avatar: File | null = null;
  avatarPreview: string = "/assets/images/defaultAvatar.png";
  user: any | null = null;
  fullname: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  recipes: any;
  isLoading: boolean = false;

  errors: FormErrors = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  }

  constructor(private userService: UserService, private router: Router, private recipesService: RecipesService){}

  async ngOnInit(): Promise<void>{
    this.user = await this.userService.getUserData();
    if(this.user?.avatar) this.avatarPreview = `http://localhost:5000/media/image/${this.user.avatar}`;
    this.fullname = this.user.fullname;
    this.email = this.user.email;
    this.recipes = await this.recipesService.getUserRecipes();
  }

  handleFileInput(event: any): void{
    const input = event.target;
    const files = input.files;
    this.avatarPreview = URL.createObjectURL(files[0]);
    this.avatar = files[0];
    input.value = "";
  }

  deletePreview(): void{
    this.avatarPreview = "/assets/images/defaultAvatar.png";
  }

  signOut(): void{
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  validateData(): boolean{
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

    if(this.password.trim().length > 0 && this.password.trim().length < 6){
        this.errors.password = "Минимальная длина пароля 6 символов";
        hasErrors = true;
    }else if(this.password.trim().length > 150){
        this.errors.password = "Максимальная длина 150 символов";
        hasErrors = true;
    }

    if(this.confirmPassword.trim().length > 0 && this.confirmPassword.trim().length < 6){
        this.errors.confirmPassword = "Минимальная длина пароля 6 символов";
        hasErrors = true;
    }else if(this.confirmPassword.trim().length > 150){
        this.errors.confirmPassword = "Максимальная длина 150 символов";
        hasErrors = true;
    }

    if(this.password.trim() !== this.confirmPassword.trim()){
      this.errors.general = "Пароли не совпадают";
      hasErrors = true;
    }

    if(this.avatar && !this.avatar.type.startsWith("image")){
      this.errors.general = "Недопустимый формат файла.";
      hasErrors = true;
    }

    return hasErrors;
  }

  async handleSubmit(): Promise<void>{
    if(this.validateData()) return;

    const formData = new FormData();

    formData.append("fullname", this.fullname);
    formData.append("email", this.email);
    if(this.password) formData.append("password", this.password);
    if(this.avatar) formData.append("avatar", this.avatar);
    this.isLoading = true;
  
    try {
      await this.userService.updateUserData(formData);
      this.router.navigate(["/"]);
    } catch (error) {
      if(axios.isAxiosError(error)){
        this.errors.general = error.response?.data?.errors[0].msg;
      }
    } finally {
      this.isLoading = false;
    }
  }
}
