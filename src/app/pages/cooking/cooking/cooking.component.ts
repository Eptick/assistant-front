import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/types/shared/recipe.types';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.scss']
})
export class CookingComponent implements OnInit {

  selectedRecipes: Recipe[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
