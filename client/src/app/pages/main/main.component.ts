import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { RecipeCardsComponent } from '../../components/recipe-cards/recipe-cards.component';
import { LatestRecipeCardsComponent } from '../../components/latest-recipe-cards/latest-recipe-cards.component';


@Component({
  selector: 'app-main',
  imports: [HeaderComponent, FooterComponent, RecipeCardsComponent, LatestRecipeCardsComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  categories: any;
  latestRecipes: any;

  constructor(private categoriesService: CategoriesService, private router: Router){}

  async ngOnInit(){
    this.categories = await this.categoriesService.getPopularCategories();
  }
}
