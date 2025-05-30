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
  avatarPreview: string = "";
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
    this.avatarPreview = this.user.avatar;
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
    this.avatarPreview = this.user.avatar;
  }

  signOut(): void{
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  validateData(): boolean{
    this.errors.fullname = "";
    this.errors.email = "";
    this.errors.password = "";
    this.errors.general = "";

    let hasErrors = false;

    return hasErrors;
  }

  async handleSubmit(): Promise<void>{
    if(this.validateData()) return;

    const formData = new FormData();

    formData.append("fullname", this.fullname);
    formData.append("email", this.email);
    formData.append("password", this.password);
    if(this.avatar) formData.append("avatar", this.avatar);
    
    this.isLoading = true;
  
    try {
      await this.userService.updateUserData(formData);
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
