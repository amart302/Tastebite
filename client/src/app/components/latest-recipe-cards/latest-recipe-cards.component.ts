import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-recipe-cards',
  imports: [NgFor, RouterLink],
  templateUrl: './latest-recipe-cards.component.html',
  styleUrl: './latest-recipe-cards.component.scss'
})
export class LatestRecipeCardsComponent {
  latestRecipes: any;

  constructor(private recipesService: RecipesService){}

  async ngOnInit(){
    this.latestRecipes = await this.recipesService.getLatestRecipes();
  }
}
