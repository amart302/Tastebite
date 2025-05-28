import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { MainComponent } from './pages/main/main.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: "signup", component: SignupComponent },
    { path: "signin", component: SigninComponent },
    { path: "addrecipe", component: AddRecipeComponent },
    { path: "recipe/:id", component: RecipeComponent },
    { path: "profile", component: ProfileComponent },
    { path: "", component: MainComponent }
];
