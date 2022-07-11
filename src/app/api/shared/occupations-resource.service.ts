import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceServerService } from 'src/app/resource-server.service';

export type OccupationResource = {
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class OccupationsResourceService {
  private readonly serviceBase: string = '/shared';

  constructor(private resource: ResourceServerService) {}

  public getOccupations(): Observable<OccupationResource[]> {
    return this.resource.http.get<OccupationResource[]>(
      `${this.resource.base}${this.serviceBase}/occupations`
    );
  }
}
