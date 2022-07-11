import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { IngredientsService } from 'src/app/api/cooking/ingredients.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent implements OnInit {

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private ingredientsService: IngredientsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      console.table(this.form.value);
      this.ingredientsService.saveIngredient(this.form.value)
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
