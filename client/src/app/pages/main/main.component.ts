import { OnInit, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RecipesService } from '../../services/recipes.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, FooterComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  recipes: any;

  constructor(private recipeService: RecipesService){}

  ngOnInit(): void{
    this.recipes = this.recipeService.getRecipes();
  }
}
