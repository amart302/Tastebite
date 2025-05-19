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

  constructor(private recipesService: RecipesService, private categoriesService: CategoriesService, private router: Router){}

  ngOnInit(): void{
    if(!localStorage.getItem("token")){
      this.router.navigate(["/signin"]);
      return ;
    }this.recipes = this.recipesService.getRecipes();
    this.categories = this.categoriesService.getCategoies();

  }

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
