import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceServerService } from 'src/app/resource-server.service';
import { CreateRecipeDto } from 'src/app/types/recipe/CreateRecipeDto.types';
import { Recipe } from 'src/app/types/shared/recipe.types';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private readonly serviceBase: string = '/cooking/recipes';

  constructor(private resource: ResourceServerService) {}

  public getRecipes(name: string = ""): Observable<any> {
    return this.resource.http.get<any[]>(
      `${this.resource.base}${this.serviceBase}?name=${name}`
    );
  }

  public getRecipe(uuid: string): Observable<any> {
    return this.resource.http.get<any[]>(
      `${this.resource.base}${this.serviceBase}/${uuid}`
    );
  }

  public saveRecipe(data: CreateRecipeDto) {
    return this.resource.http.post(
      `${this.resource.base}${this.serviceBase}`,
      data
    );
  }
  
  public deleteRecipe(uuid: string) {
    return this.resource.http.delete(`${this.resource.base}${this.serviceBase}/${uuid}`);
  }
}
