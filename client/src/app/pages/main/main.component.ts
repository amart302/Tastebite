import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RecipesService } from '../../services/recipes.service';
import { NgFor } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-main',
  imports: [HeaderComponent, FooterComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  recipes: any;
  categories: any;
  latestRecipes: any;

  constructor(private recipesService: RecipesService, private categoriesService: CategoriesService, private router: Router){}

  async ngOnInit(){
    this.recipes = this.recipesService.getRecipes();
    this.categories = await this.categoriesService.getPopularCategories();
    this.latestRecipes = this.recipesService.getLatestRecipes();
  }

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
