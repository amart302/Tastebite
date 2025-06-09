import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { ConfirmationWindowComponent } from '../../components/confirmation-window/confirmation-window.component';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent, FooterComponent, NgFor, NgIf, ConfirmationWindowComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  recipe: any;
  activeIndex: number = 0;
  userId: string | null = localStorage.getItem("userId");
  confirmationWindow: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService){}

  async ngOnInit(): Promise<void>{
    const id: string | null = this.route.snapshot.paramMap.get("id");
    this.recipe = await this.recipesService.getRecipeData(id);
    console.log(this.recipe);
    
  }

  prevSlide(): void{
    if(this.activeIndex < 1) this.activeIndex = this.recipe.files.length - 1;
    else this.activeIndex--;
  }
  nextSlide(): void{
    if(this.activeIndex > this.recipe.files.length - 2) this.activeIndex = 0;
    else this.activeIndex++;
  }

  printPage(): void{
    window.print();
  }

  formattedDate(date: string): string{
    const isoDate = new Date(date);
      return [
      isoDate.getDate().toString().padStart(2, '0'),
      (isoDate.getMonth() + 1).toString().padStart(2, '0'),
      isoDate.getFullYear()
      ].join('.');
  }

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(null);
  }

  async deletePost(id: string): Promise<void>{
    try {
      await this.recipesService.deleteRecipe(id);
      this.router.navigate(["/"]);
    } catch (error) {
      console.error("Не удалось удалить пост", error);
    }
  }

  showConfirmationWindow(): void{
    this.confirmationWindow = true;
  }

  hideConfirmationWindow(): void{
    this.confirmationWindow = false;
  }
}
