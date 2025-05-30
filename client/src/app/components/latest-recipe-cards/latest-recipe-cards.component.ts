import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-latest-recipe-cards',
  imports: [NgFor, NgIf, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './latest-recipe-cards.component.html',
  styleUrl: './latest-recipe-cards.component.scss'
})
export class LatestRecipeCardsComponent {
  @Input() recipes!: any;
  skeletonItems = Array(8).fill(null);
}
