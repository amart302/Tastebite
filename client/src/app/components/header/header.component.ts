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
  avatar: string = "/assets/images/defaultAvatar.png";
  formType: "login" | "regist" | null = null;

  async ngOnInit(): Promise<void>{
    try {
      const response = await this.userService.getUserAvatar();
      if(response) this.avatar =  `http://localhost:5000/media/image/${response}`;
    } catch (error) {
      console.error("Не удалось загрузить данные", error);
    }
  }

  goToAddRecipe(): void{
    if(!localStorage.getItem("token")) this.changeFormType();
    else this.router.navigate(["/addrecipe"]);
  }

  checkUrl(): boolean{
    return (this.router.url !== "/addrecipe") ? true : false;
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
