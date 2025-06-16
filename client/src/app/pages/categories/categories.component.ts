import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CategoriesService } from '../../services/categories.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [HeaderComponent, FooterComponent, NgxSkeletonLoaderModule, NgIf, NgFor, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: any | null = null;

  constructor(private categoriesService: CategoriesService){}

  async ngOnInit(): Promise<void>{
    try {
      this.categories = await this.categoriesService.getCategories();
    } catch (error) {
      console.error("Не удалось загрузить категории", error);
    }
  }

  skeletonItems = Array(15).fill(null);
}
