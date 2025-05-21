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
    const token = localStorage.getItem("token") || "";
    if(token){
      this.userAvatar(token);
    }
  }

  async userAvatar(token: string){
    try {
      const response = await this.userService.getUserAvatar(token);
      this.avatar = response.data;
    } catch (error) {
      console.error("Ошибка при попытке получить аватар пользователя", error);
    }
  }

  goToAddRecipe(){
    if(!localStorage.getItem("token")) this.router.navigate(["/signin"]);
    else this.router.navigate(["/addrecipe"]);
  }
}
