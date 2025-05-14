import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    { path: "signup", component: SignupComponent },
    { path: "signin", component: SigninComponent },
    { path: "", component: MainComponent }
];
