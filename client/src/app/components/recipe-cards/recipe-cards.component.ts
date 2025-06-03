import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-recipe-cards',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, NgxSkeletonLoaderModule],
  templateUrl: './recipe-cards.component.html',
  styleUrl: './recipe-cards.component.scss'
})
export class RecipeCardsComponent {
  @Input() recipes!: any[];

  skeletonItems = Array(3).fill(null);

  getRatingArray(rating: number): number[] {
    return Array(rating).fill(null);
  }
}
