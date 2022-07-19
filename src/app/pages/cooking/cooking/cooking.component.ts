import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/types/shared/ingredient.types';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.scss']
})
export class CookingComponent implements OnInit {

  selectedIngredients: Ingredient[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
