import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { OccupationResource, OccupationsResourceService } from 'src/app/api/shared/occupations-resource.service';
import { __values } from 'tslib';


const CACHE_SIZE = 4;

@Injectable({
  providedIn: 'root'
})
export class OccupationsService {

  private cache$: Observable<OccupationResource[]> | undefined;

  constructor(private resource: OccupationsResourceService) {}

  get occupations() {
    if (!this.cache$) {
      this.cache$ = this.requestJokes().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  private requestJokes(): Observable<OccupationResource[]> {
    return this.resource.getOccupations().pipe(map(result => result));
  }

  get occupationDropdownValues() {
    return this.occupations.pipe(
      map(values => values.map( values => ({
        ...values,
        name: this.codeToLabel(values.code)
      })))
    )
  }

  private codeToLabel(code: string) {
    switch (code) {
      case 'DIGITAL_MARKETING':
        return 'Digitalni marketing'
      case 'OTHER':
        return 'Ostalo'
      case 'MUSIC_AND_AUDIO':
        return 'Muzika i audio'
      case 'VIDEO_AND_ANIMATION':
        return 'Video i animacija'
      case 'GRAPHICS_AND_DESIGN':
        return 'Grafički i digitalni dizajn'
      case 'PROGRAMMING_AND_TECH':
        return 'Programiranje i IT'
      case 'WRITING_AND_TRANSLATIONS':
        return 'Pisanje i prijevodi'
      default:
        return code;
    }
  }
}
