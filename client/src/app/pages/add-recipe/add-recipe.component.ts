import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { NgFor, NgIf } from '@angular/common';

type Recipe = {
  title: string;
  category: string;
  description: string;
  prepTime: number;
  servings?: number;
  ingredients: Ingredient[];
  instructions: string[];
  files: File[];
}

type Ingredient = {
  name: string;
  amount?: number;
  unit: string;
}

type Category = {
  id: string;
  title: string;
}

type File = {
  lastModified: number,
  lastModifiedDate: string,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string
}

type FormErrors = Record<"title" |
  "category" |
  "description" |
  "prepTime" |
  "ingredientName" |
  "ingredientAmount" |
  "ingredientUnit" |
  "instructionStep" |
  "general", string>

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  instructions: string[] = [];
  files: File[] = [];

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
    ingredientName: "",
    ingredientAmount: "",
    ingredientUnit: "",
    instructionStep: "",
    general: ""
  };

  isLoading = false;

  constructor(private categoriesService: CategoriesService){}

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
    }else if(this.ingredientName.trim().length > 50){
      this.errors.ingredientName = "Максимальная длина 50 символов";
    }

    if(this.ingredientAmount === null){
      this.errors.ingredientAmount = "Это поле обязательно для заполнения";
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

    if(this.description.trim().length > 1000){
      this.errors.description = "Максимальная длина 1000 символов";
      hasErrors = true;
    }

    if(this.prepTime === null){
      this.errors.prepTime = "Это поле обязательно для заполнения";
      hasErrors = true;
    }
    
    if(!this.ingredients.length){
      this.errors.ingredientName = "Это поле обязательно для заполнения";
      this.errors.ingredientAmount = "Это поле обязательно для заполнения";
      this.errors.ingredientUnit = "Это поле обязательно для заполнения";
      hasErrors = true;
    }

    if(!this.instructions.length){
      this.errors.instructionStep = "Это поле обязательно для заполнения";
      hasErrors = true;
    }

    return hasErrors;
  }

  createImageUrl(file: any): string {
    return URL.createObjectURL(file);
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    
    if (!files || files.length === 0) {
      console.log('Файлы не выбраны');
      return;
    }
  
    for(let item of files){
      this.files.push(item);
    }
  }

  removeFile(index: number): void{
    this.files.splice(index, 1);
  }

  async handleSubmit(): Promise<void>{
    if(this.validateData()) return;
    
    this.isLoading = true;

    try {
      const recipeData: Recipe = {
        title: this.title,
        category: this.category,
        description: this.description,
        prepTime: this.prepTime!,
        servings: this.servings ?? undefined,
        ingredients: this.ingredients,
        instructions: this.instructions,
        files: this.files,
      };

      console.log('Отправка данных:', recipeData);
      
    } catch (error){
      console.error("Ошибка при добавлении поста", error);
      this.errors.general = "Произошла ошибка при сохранении рецепта";
    } finally {
      this.isLoading = false;
    }
  }

  async ngOnInit(): Promise<void>{
    try {
      this.categories = await this.categoriesService.getCategories();
    } catch (error){
      console.error("Не удалось загрузить категории", error);
      this.errors.general = "Не удалось загрузить категории";
    }
  }
}