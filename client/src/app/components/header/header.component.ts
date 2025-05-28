import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import axios from 'axios';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ){}
  avatar: any;

  async ngOnInit(){
    this.avatar = await this.userService.getUserAvatar();
  }

  goToAddRecipe(){
    if(!localStorage.getItem("token")) this.router.navigate(["/signin"]);
    else this.router.navigate(["/addrecipe"]);
  }

  checkUrl(){
    return this.router.url == "/" || this.router.url == "/profile";
  }
}
