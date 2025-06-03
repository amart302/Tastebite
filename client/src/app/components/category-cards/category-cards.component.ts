import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-category-cards',
  imports: [NgFor, NgIf, NgxSkeletonLoaderModule],
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.scss'
})
export class CategoryCardsComponent {
  @Input() categories!: any[];

  skeletonItems = Array(6).fill(null);
}
