import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { RecipesService } from 'src/app/api/cooking/recipes.service';
import { Ingredient } from 'src/app/types/shared/ingredient.types';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  selectedIngredients: Ingredient[] = [];

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      console.table(this.form.value);
      this.recipesService.saveRecipe({
        ...this.form.value,
        ingredients: this.selectedIngredients.map(e => ({ingredientUUID: e.uuid, quantity: 'dva'}))
      })
      .pipe(
        catchError(err => {
          console.error(err.error)
          this.form.setErrors({...err.error})
          return EMPTY;
        })
      ).subscribe(data => {
        // this.router.navigate(['/onboarding/provider/step-two']);
      })
    }
  }
}
