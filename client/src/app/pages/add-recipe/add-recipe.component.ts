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
  prepTime: number = 0;
  servings: number = 0;
  ingredientName: string = "";
  ingredientAmount: number = 0;
  ingredientUnit: string = "";
  instructionStep: string = "";

  titleError: string = "";
  categoryError: string = "";
  descriptionError: string = "";
  prepTimeError: string = "";
  ingredientNameError: string = "";
  ingredientAmountError: string = "";
  ingredientUnitError: string = "";
  instructionStepError: string = "";
  generalError: string = "";

  isLoading: boolean = false;

  constructor(private categoriesService: CategoriesService){}

  validateData(){
    this.titleError = "";
    this.categoryError = "";
    this.descriptionError = "";
    this.prepTimeError = "";
    this.ingredientNameError = "";
    this.ingredientAmountError = "";
    this.instructionStepError = "";
    this.generalError = "";

    if(!this.title.trim()){
        this.titleError = "Это поле обязательно для заполнения";
    }else if(this.title.trim().length > 50){
        this.titleError = "Максимальная длина 50 символов";
    }

    if(!this.category.trim()){
        this.categoryError = "Это поле обязательно для заполнения";
    }

    if(this.description.trim().length > 1000){
        this.descriptionError = "Максимальная длина 1000 символов";
    }

    if(!this.prepTime){
        this.prepTimeError = "Это поле обязательно для заполнения";
    }

    if(!this.ingredientName.trim() && !this.instructions.length){
        this.ingredientNameError = "Это поле обязательно для заполнения";
    }else if(this.ingredientName.trim().length > 50){
        this.ingredientNameError = "Максимальная длина 50 символов";
    }

    if(!this.ingredientAmount && !this.instructions.length){
        this.ingredientAmountError = "Это поле обязательно для заполнения";
    }

    if(!this.ingredientUnit.trim() && !this.instructions.length){
        this.ingredientUnitError = "Это поле обязательно для заполнения";
    }

    if(!this.instructionStep.trim() && !this.instructions.length){
        this.instructionStepError = "Это поле обязательно для заполнения";
    }else if(this.instructionStep.trim().length > 500){
        this.instructionStepError = "Максимальная длина 500 символов";
    }
    
  };

  async handleSubmit(){
    try {
      this.validateData();

      if(this.titleError ||
        this.categoryError ||
        this.descriptionError ||
        this.prepTimeError ||
        this.ingredientNameError ||
        this.ingredientAmountError ||
        this.ingredientUnitError ||
        this.instructionStepError) return;
      
      const data = {
        title: this.title,
        category: this.category,
        description: this.description,
        prepTime: this.prepTime,
        servings: this.servings,
        ingredientName: this.ingredientName,
        ingredientAmount: this.ingredientAmount,
        ingredientUnit: this.ingredientUnit,
        instructionStep: this.instructionStep
      };

      console.log(data);
      
    } catch (error) {
      console.error("Ошибка при добавлении поста", error);
    } finally {
      setTimeout(() => this.isLoading = false, 600);
    }
  }

  async ngOnInit(){
    this.categories = await this.categoriesService.getCategoies();
  }
}
