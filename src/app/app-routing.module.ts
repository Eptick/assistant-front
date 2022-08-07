import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { RecipeComponent } from './cooking/recipe/recipe.component';
import { RecipesComponent } from './cooking/recipes/recipes.component';
import { AddIngredientComponent } from './pages/cooking/add-ingredient/add-ingredient.component';
import { AddRecipeComponent } from './pages/cooking/add-recipe/add-recipe.component';
import { CookingComponent } from './pages/cooking/cooking/cooking.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {path:'', component: LandingComponent, canActivate: [AuthGuard]},
  {
    path: 'cooking',
    component: CookingComponent,
    canActivate: [AuthGuard],
    children: [
      {path:'add-ingredient', component: AddIngredientComponent, canActivate: [AuthGuard]},
      {path:'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard]},
      {path:'recipe/:id', component: RecipeComponent, canActivate: [AuthGuard]},
      {path:'**', component: RecipesComponent, canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
