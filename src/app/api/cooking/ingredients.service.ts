import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceServerService } from 'src/app/resource-server.service';
import { Ingredient } from 'src/app/types/shared/ingredient.types';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private readonly serviceBase: string = '/cooking/ingredients';

  constructor(private resource: ResourceServerService) {}

  public getIngredients(): Observable<any> {
    return this.resource.http.get<any[]>(
      `${this.resource.base}${this.serviceBase}`
    );
  }

  public saveIngredient(data: Ingredient) {
    return this.resource.http.post(
      `${this.resource.base}${this.serviceBase}/in`,
      data
    );
  }
}
