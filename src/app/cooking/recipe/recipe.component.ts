import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/api/cooking/recipes.service';
import { Recipe } from 'src/app/types/shared/recipe.types';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public id?: string;
  public recipe?: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.recipeService.getRecipe(this.id).subscribe(data => this.recipe = data);
  }

}
