import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { MainComponent } from './pages/main/main.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    { path: "signup", component: SignupComponent },
    { path: "signin", component: SigninComponent },
    { path: "addrecipe", component: AddRecipeComponent },
    { path: "product/:id", component: ProductComponent },
    { path: "", component: MainComponent }
];
