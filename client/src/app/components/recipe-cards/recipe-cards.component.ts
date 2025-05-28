import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-cards',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
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
