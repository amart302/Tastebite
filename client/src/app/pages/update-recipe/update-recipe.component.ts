import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { NgFor, NgIf } from '@angular/common';
import { RecipesService } from '../../services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

type Ingredient = {
  name: string;
  amount?: number;
  unit: string;
}

type Category = {
  id: string;
  title: string;
}

type FormErrors = Record<"title" |
  "category" |
  "description" |
  "prepTime" |
  "servings" |
  "ingredientName" |
  "ingredientAmount" |
  "ingredientUnit" |
  "instructionStep" |
  "general", string>

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf],
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.scss'
})
export class UpdateRecipeComponent {
  recipeId: string | null = null;
  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  instructions: string[] = [];
  files: File[] = [];
  filesPreviews: any[] = [];

  title = "";
  category = "";
  description = "";
  prepTime: number | null = null;
  servings: number | null = null;
  ingredientName = "";
  ingredientAmount: number | null = null;
  ingredientUnit = "";
  instructionStep = "";

  errors: FormErrors = {
    title: "",
    category: "",
    description: "",
    prepTime: "",
    servings: "",
    ingredientName: "",
    ingredientAmount: "",
    ingredientUnit: "",
    instructionStep: "",
    general: ""
  };

  isLoading = false;

  constructor(
    private recipesService: RecipesService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  async ngOnInit(): Promise<void>{
    try {
      this.recipeId = this.route.snapshot.paramMap.get("id");
      const recipe = await this.recipesService.getRecipeData(this.recipeId);
      if(recipe){
        this.title = recipe.title;
        this.category = recipe.category;
        this.description = recipe.description;
        this.prepTime = recipe.prepTime;
        if(recipe.servings) this.servings = recipe.servings;
        this.ingredients = recipe.ingredients;
        this.instructions = recipe.instructions;
      }
      this.categories = await this.categoriesService.getCategories();
    } catch (error){
      console.error("Не удалось загрузить данные", error);
      this.errors.general = "Не удалось загрузить данные";
    }
  }

  addIngredient(): void{
    if(this.ingredientValidate()) return;
    
    const newIngredient: Ingredient = {
      name: this.ingredientName.trim(),
      amount: this.ingredientAmount!,
      unit: this.ingredientUnit
    };
    
    this.ingredients.push(newIngredient);
    this.ingredientName = "";
    this.ingredientAmount = null;
    this.ingredientUnit = "";
  }

  removeIngredient(index: number): void{
    this.ingredients.splice(index, 1);
  }

  addInstruction(): void{
    if(this.instructionValidate()) return;

    this.instructions.push(this.instructionStep);
    this.instructionStep = "";
  }

  removeInstruction(index: number): void{
    this.instructions.splice(index, 1);
  }

  private ingredientValidate(): boolean{
    this.errors.ingredientName = "";
    this.errors.ingredientAmount = "";
    this.errors.ingredientUnit = "";
    
    if(!this.ingredientName.trim()){
      this.errors.ingredientName = "Это поле обязательно для заполнения";
    }else if(this.ingredientName.trim().length > 40){
      this.errors.ingredientName = "Максимальная длина 40 символов";
    }

    if(this.ingredientAmount === null){
      this.errors.ingredientAmount = "Это поле обязательно для заполнения";
    }else if(this.ingredientAmount < 0){
      this.errors.ingredientAmount = "Это поле не должно быть отрицательным числом";
    }else if(this.ingredientAmount.toString().length > 10){
      this.errors.ingredientAmount = "Максимальная длина 10 символов"
    }

    if(!this.ingredientUnit){
      this.errors.ingredientUnit = "Это поле обязательно для заполнения";
    }
    
    return !!this.errors.ingredientName ||
            !!this.errors.ingredientAmount ||
            !!this.errors.ingredientUnit;
  }

  private instructionValidate(): boolean{
    this.errors.instructionStep = "";

    if(!this.instructionStep.trim()){
      this.errors.instructionStep = "Это поле обязательно для заполнения";
    }else if(this.instructionStep.trim().length > 500){
      this.errors.instructionStep = "Максимальная длина 500 символов";
    }
    return !!this.errors.instructionStep;
  }

  private resetErrors(): void{
    this.errors = {
      title: "",
      category: "",
      description: "",
      prepTime: "",
      servings: "",
      ingredientName: "",
      ingredientAmount: "",
      ingredientUnit: "",
      instructionStep: "",
      general: ""
    };
  }

  private validateData(): boolean{
    this.resetErrors();

    let hasErrors = false;

    if(!this.title.trim()){
      this.errors.title = "Это поле обязательно для заполнения";
      hasErrors = true;
    }else if(this.title.trim().length > 50){
      this.errors.title = "Максимальная длина 50 символов";
      hasErrors = true;
    }
    
    if(!this.category){
      this.errors.category = "Это поле обязательно для заполнения";
      hasErrors = true;
    }
    
    if(!this.description.trim()){
      this.errors.description = "Это поле обязательно для заполнения";
    }else if(this.description.trim().length > 3000){
      this.errors.description = "Максимальная длина 3000 символов";
      hasErrors = true;
    }

    if(this.prepTime === null){
      this.errors.prepTime = "Это поле обязательно для заполнения";
      hasErrors = true;
    }else if(this.prepTime < 0){
      this.errors.prepTime = "Это поле не должно быть отрицательным числом";
      hasErrors = true;
    }else if(this.prepTime.toString().length > 4){
      this.errors.prepTime = "Максимальная длина 4 символов"
    }

    if(this.servings !== null && this.servings < 0){
      this.errors.servings = "Это поле не должно быть отрицательным числом";
      hasErrors = true;
    }else if(this.servings !== null && this.servings.toString().length > 3){
      this.errors.servings = "Максимальная длина 3 символов"
    }
    
    if(!this.ingredients.length){
      this.errors.ingredientName = "Добавьте ингредиенты";
      hasErrors = true;
    }

    if(!this.instructions.length){
      this.errors.instructionStep = "Добавьте интрукции";
      hasErrors = true;
    }

    // if(!this.files.length){
    //   this.errors.general = "Загрузите файлы";
    //   hasErrors = true;
    // }else if(this.files.length > 10){
    //   this.errors.general = "Максимальное количество загружаемых файлов: 10";
    //   hasErrors = true;
    // }

    // let hasUploadedImage  = false;
    // this.files.forEach(item => {
    //     if(item.type.startsWith("image/")) hasUploadedImage = true;
    // });

    // if(!hasUploadedImage){
    //   this.errors.general = "Загрузите хотя бы одно изображение";
    //   hasErrors = true;
    // }

    return hasErrors;
  }

  // handleFileInput(event: any): void{
  //   const input = event.target;
  //   const files = input.files;
  
  //   for(let item of files){
  //     this.files.push(item);
  //     const url = URL.createObjectURL(item);
  //     this.filesPreviews.push({ url: url, type: item.type });
  //   }
  //   input.value = "";
  // }

  // removeFile(index: number): void{
  //   this.filesPreviews.splice(index, 1);
  //   this.files.splice(index, 1);
  // }

  async handleSubmit(): Promise<void>{
    if(this.validateData()) return;
    
    this.isLoading = true;

    try {
      const formData = new FormData();
    
      formData.append("title", this.title);
      formData.append("category", this.category);
      formData.append("description", this.description);
      formData.append("prepTime", this.prepTime!.toString());
      if(this.servings) formData.append("servings", this.servings!.toString());
      formData.append("ingredients", JSON.stringify(this.ingredients));
      formData.append("instructions", JSON.stringify(this.instructions));
      if(this.files.length) this.files.forEach((item: File) => formData.append("files", item));

      await this.recipesService.updateRecipe(this.recipeId, formData);
      this.router.navigate(["/recipe", this.recipeId]);
    } catch (error){
      console.error("Ошибка при входе:", error);
      if(axios.isAxiosError(error)){
        this.errors.general = error.response?.data?.error || error.response?.data?.errors[0].msg;
      }
    } finally {
      this.isLoading = false;
    }
  }
}