import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  recipe: any;

  constructor(private route: ActivatedRoute, private resipesService: RecipesService){}

  async ngOnInit(): Promise<void>{
    const id: string | null = this.route.snapshot.paramMap.get("id");
    this.recipe = await this.resipesService.getRecipeData(id);
  }
}
