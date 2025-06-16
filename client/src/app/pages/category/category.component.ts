import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeCardsComponent } from '../../components/recipe-cards/recipe-cards.component';

@Component({
  selector: 'app-category',
  imports: [HeaderComponent, FooterComponent, RecipeCardsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  recipes: any | null;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute){}

  async ngOnInit(){
    try {
      const title: string | null = this.route.snapshot.paramMap.get("title");
      this.recipes = await this.recipesService.getRecipesByCategory(title);
    } catch (error) {
      console.error("Не удалось загрузить данные", error);
    }
  }
}
