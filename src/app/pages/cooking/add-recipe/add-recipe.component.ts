import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/types/shared/ingredient.types';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  selectedIngredients: Ingredient[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
