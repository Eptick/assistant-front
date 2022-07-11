import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OccupationResource } from 'src/app/api/shared/occupations-resource.service';
import { OccupationsService } from 'src/app/services/shared/occupations.service';

@Component({
  selector: 'app-occupation-dropdown',
  templateUrl: './occupation-dropdown.component.html',
  styleUrls: ['./occupation-dropdown.component.scss']
})
export class OccupationDropdownComponent {
  @Input()
  public control!: FormControl;

  public occupations: OccupationResource[] = []

  constructor(private occupationService: OccupationsService) {
    this.occupationService.occupationDropdownValues.subscribe(val => {
      this.occupations = val;
    })
  }

}
