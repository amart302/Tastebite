import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, SignupComponent, SigninComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ){}
  avatar: any;
  formType: "login" | "regist" | null = null;

  async ngOnInit(): Promise<void>{
    this.avatar = await this.userService.getUserAvatar();
  }

  goToAddRecipe(): void{
    if(!localStorage.getItem("token")) this.changeFormType();
    else this.router.navigate(["/addrecipe"]);
  }

  checkUrl(): boolean{
    return this.router.url == "/" || this.router.url == "/profile";
  }

  changeFormType(): void{
    this.formType = this.formType === 'login' ? 'regist' : 'login';
  }

  closeForm(): void{
    this.formType = null;
  }

  goToProfile(): void{
    if(!localStorage.getItem("token")) this.changeFormType();
    else this.router.navigate(["/profile"]);
  }
}
