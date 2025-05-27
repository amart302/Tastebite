import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MainComponent } from '../../pages/main/main.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-cards',
  imports: [NgFor],
  templateUrl: './recipe-cards.component.html',
  styleUrl: './recipe-cards.component.scss'
})
export class RecipeCardsComponent {
  recipes: any[] | null = null;
  
  constructor(private recipesService: RecipesService){}

  async ngOnInit(){
    this.recipes = await this.recipesService.getRecipes();
  }

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
