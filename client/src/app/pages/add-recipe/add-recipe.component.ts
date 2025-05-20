import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  categories: any;
  title: string = "";

  constructor(private categoriesService: CategoriesService){}

  async ngOnInit(){
    this.categories = await this.categoriesService.getCategoies();
  }
}
