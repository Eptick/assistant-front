import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { AddIngredientComponent } from './pages/cooking/add-ingredient/add-ingredient.component';
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
