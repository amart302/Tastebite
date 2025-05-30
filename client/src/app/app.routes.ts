import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: "addrecipe", component: AddRecipeComponent },
    { path: "recipe/:id", component: RecipeComponent },
    { path: "profile", component: ProfileComponent },
    { path: "", component: MainComponent }
];
