import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import axios from 'axios';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ){}
  user: any;
  avatar: any;

  ngOnInit(){
    const token: string | null = localStorage.getItem("token");
    this.userData(token);
  }

  async userData(token: string | null){
    try {
      const response = await this.userService.getUserData(token);
      this.avatar = response.avatar;
    } catch (error) {
      console.error("Ошибка при попытке получить данные пользователя", error);
    }
  }

  goToAddRecipe(){
    if(!localStorage.getItem("token")) this.router.navigate(["/signin"]);
    else this.router.navigate(["/addrecipe"]);
  }
}
