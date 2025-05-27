import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  recipe: any;

  constructor(private route: ActivatedRoute){}

  async ngOnInit(){
    const id = this.route.snapshot.paramMap.get("id");
  }

  async getRecipeData(id: string){
    try {
      
    } catch (error) {
      console.error("Не удалось получить данные пост", error);
    }
  }
}
