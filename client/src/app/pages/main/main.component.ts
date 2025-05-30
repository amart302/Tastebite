import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { RecipeCardsComponent } from '../../components/recipe-cards/recipe-cards.component';
import { LatestRecipeCardsComponent } from '../../components/latest-recipe-cards/latest-recipe-cards.component';
import { RecipesService } from '../../services/recipes.service';


@Component({
  selector: 'app-main',
  imports: [HeaderComponent, FooterComponent, RecipeCardsComponent, LatestRecipeCardsComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  categories: any;
  recipes: any;
  latestRecipes: any;

  constructor(private categoriesService: CategoriesService, private recipesService: RecipesService){}

  async ngOnInit(): Promise<void>{
    this.recipes = await this.recipesService.getRecipes();
    this.categories = await this.categoriesService.getPopularCategories();
    this.latestRecipes = await this.recipesService.getLatestRecipes();
  }
}
