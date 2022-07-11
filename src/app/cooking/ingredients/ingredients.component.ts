import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { IngredientsService } from 'src/app/api/cooking/ingredients.service';
import { Ingredient } from 'src/app/types/shared/ingredient.types';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  data: Ingredient[] = [];

  totalRecords: number = 0;

  cols: any[] = [];

  loading: boolean = true;


  selectAll: boolean = false;

  selected: Ingredient[] = [];

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
      this.loading = true;
  }

  loadData(event: LazyLoadEvent) {
      this.loading = true;

      setTimeout(() => {
        const data = {lazyEvent: JSON.stringify(event)};
        debugger
        this.ingredientsService.getIngredients().subscribe(res => {
          debugger;
            this.data = res.content;
            this.totalRecords = res.numberOfElements;
            this.loading = false;
        })
      }, 1000);
  }

  onSelectionChange(value = []) {
      this.selectAll = value.length === this.totalRecords;
      this.selected = value;
  }

  onSelectAllChange(event: any) {
      const checked = event.checked;

      if (checked) {
          this.ingredientsService.getIngredients().subscribe(res => {
              this.selected = res.content;
              this.selectAll = true;
          });
      }
      else {
          this.selected = [];
          this.selectAll = false;
      }
  }
}
