import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;

  constructor(private userService: UserService, private router: Router){}

  async ngOnInit(){
    this.user = await this.userService.getUserData();
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(["/signin"]);
  }
}
