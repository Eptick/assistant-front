import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceServerService } from 'src/app/resource-server.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private readonly serviceBase: string = '/cooking';

  constructor(private resource: ResourceServerService) {}

  public getIngredients(): Observable<any> {
    return this.resource.http.get<any[]>(
      `${this.resource.base}${this.serviceBase}`
    );
  }
}
