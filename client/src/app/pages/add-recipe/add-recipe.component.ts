import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  categories: any;
  ingredients: any = [];
  instructions: any = [];

  title: string = "";
  category: string = "";
  description: string = "";
  prepTime: number | undefined;
  servings: number | undefined;
  ingredientName: string = "";
  ingredientAmount: number | undefined;
  ingredientUnit: string = "";
  instructionStep: string = "";

  errors = {
    title: "",
    category: "",
    description: "",
    prepTime: "",
    ingredientName: "",
    ingredientAmount: "",
    ingredientUnit: "",
    instructionStep: "",
    general: ""
  }

  isLoading: boolean = false;

  constructor(private categoriesService: CategoriesService){}

  addIngredient(){
    if(this.ingredientValidate()) return;
    
    const data = {
      name: this.ingredientName.trim(),
      amount: this.ingredientAmount,
      unit: this.ingredientUnit
    };
    this.ingredients.push(data);

    this.ingredientName = "";
    this.ingredientAmount = undefined;
    this.ingredientUnit = "";
  };

  removeIngredient(index: number){
    this.ingredients.splice(index, 1);
  };

  ingredientValidate(){
    this.errors.ingredientName = "";
    this.errors.ingredientAmount = "";
    this.errors.ingredientUnit = "";

    if(!this.ingredientName.trim()){
        this.errors.ingredientName = "Это поле обязательно для заполнения";
    }else if(this.ingredientName.trim().length > 50){
        this.errors.ingredientName = "Максимальная длина 50 символов";
    }

    if(!this.ingredientAmount){
        this.errors.ingredientAmount = "Это поле обязательно для заполнения";
    }

    if(!this.ingredientUnit){
      this.errors.ingredientUnit = "Это поле обязательно для заполнения";
    }

    if(this.errors.ingredientName ||
      this.errors.ingredientAmount ||
      this.errors.ingredientUnit){
        return true;
    }
    return false;
  };

  validateData(){
    this.errors.title = "";
    this.errors.category = "";
    this.errors.description = "";
    this.errors.prepTime = "";
    this.errors.ingredientName = "";
    this.errors.ingredientAmount = "";
    this.errors.ingredientUnit = "";
    this.errors.instructionStep = "";
    this.errors.general = "";

    if(!this.title.trim()){
        this.errors.title = "Это поле обязательно для заполнения";
    }else if(this.title.trim().length > 50){
        this.errors.title = "Максимальная длина 50 символов";
    }
    
    if(!this.category){
      this.errors.category = "Это поле обязательно для заполнения";
    }

    if(this.description.trim().length > 1000){
        this.errors.description = "Максимальная длина 1000 символов";
    }

    if(!this.prepTime){
        this.errors.prepTime = "Это поле обязательно для заполнения";
    }

    if(!this.instructionStep.trim() && !this.instructions.length){
        this.errors.instructionStep = "Это поле обязательно для заполнения";
    }else if(this.instructionStep.trim().length > 500){
        this.errors.instructionStep = "Максимальная длина 500 символов";
    }
    
    if(!this.ingredients.length){
      this.errors.general = "Добавьте ингредиенты";
    }

    if(this.errors.title ||
      this.errors.category ||
      this.errors.description ||
      this.errors.prepTime ||
      this.errors.instructionStep ||
      this.errors.general){
      return true;
    }
    return false;
  };

  async handleSubmit(){
    try {
      const validateData = this.validateData();
      if(validateData) return;
      
      const data = {
        title: this.title,
        category: this.category,
        description: this.description,
        prepTime: this.prepTime,
        servings: this.servings,
        ingredients: this.ingredients,
        instructionStep: this.instructionStep
      };

      console.log(data);
      
    } catch (error) {
      console.error("Ошибка при добавлении поста", error);
    } finally {
      setTimeout(() => this.isLoading = false, 600);
    }
  };

  async ngOnInit(){
    try {
      this.categories = await this.categoriesService.getCategoies();
    } catch (error) {
      console.error("Не удалось загрузить категории", error);
    }
  };
}
