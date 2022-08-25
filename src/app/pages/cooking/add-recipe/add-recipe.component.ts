import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { RecipesService } from 'src/app/api/cooking/recipes.service';
import { Ingredient } from 'src/app/types/shared/ingredient.types';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  _selectedIngredients: Ingredient[] = [];

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    ingredients: new FormArray([]),
  });

  constructor(
    private router: Router,
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
  }

  get selectedIngredients(): Ingredient[] {
    return this._selectedIngredients;
  }

  set selectedIngredients(ingredients: Ingredient[]) {
    let quantityMap = this.ingredients.value.reduce((a: {[key: string]: string},b: Ingredient) => {
      a[b.uuid] = b.quantity
      return a;
    }, {})
    this.ingredients.clear();
    this._selectedIngredients = ingredients;
    ingredients = ingredients.map(elem => ({...elem, quantity: quantityMap[elem.uuid] ?? elem.quantity ?? ''}))
    ingredients.forEach((i) => this.addIngredientToForm(i))
  }

  get ingredients() {
    return this.form.controls["ingredients"] as FormArray;
  }
  
  private addIngredientToForm(ingredient: Ingredient) {
    let arr = this.form.controls['ingredients'] as FormArray
    arr.push(this.getIngredientGroup(ingredient))
  }

  private getIngredientGroup(ingredient: Ingredient) {
    return new FormGroup({
      uuid: new FormControl(ingredient.uuid, [Validators.required]),
      name: new FormControl(ingredient.name, [Validators.required]),
      quantity: new FormControl(ingredient.quantity, [Validators.required])
    })
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      console.table(this.form.value);
      this.recipesService.saveRecipe({
        ...this.form.value,
        ingredients: this.ingredients.controls.map((e) => {
          const g: FormGroup = e as FormGroup
          const ingredientUUID = g.controls['uuid'].value
          const quantity = g.controls['quantity'].value
          debugger
          return {ingredientUUID, quantity: quantity}
        })
      })
      .pipe(
        catchError(err => {
          console.error(err.error)
          this.form.setErrors({...err.error})
          return EMPTY;
        })
      ).subscribe(data => {
        this.router.navigate(['/cooking']);
      })
    }
  }
}
