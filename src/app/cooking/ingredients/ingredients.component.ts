import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
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

  contextMenu: MenuItem[] = [];
  contextSelection?: Ingredient;

  constructor(private dataService: IngredientsService) { }

  ngOnInit() {
      this.loading = true;

      this.contextMenu = [
        {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteItem()}
    ];
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;
    const data = {lazyEvent: JSON.stringify(event)};
    const name: string = event.filters?.["name"]?.value ?? ''; 
    this.dataService.getIngredients(name).subscribe(res => {
        this.data = res.content;
        this.totalRecords = res.numberOfElements;
        this.loading = false;
    })
  }

  onSelectionChange(value = []) {
      this.selectAll = value.length === this.totalRecords;
      this.selected = value;
  }

  onSelectAllChange(event: any) {
      const checked = event.checked;

      if (checked) {
          this.dataService.getIngredients().subscribe(res => {
              this.selected = res.content;
              this.selectAll = true;
          });
      }
      else {
          this.selected = [];
          this.selectAll = false;
      }
  }

  deleteItem() {
    const uuid: string | undefined = this.contextSelection?.uuid;
    if(!uuid) throw new Error("No uuid");
    this.dataService.deleteIngredient(uuid).subscribe();
}
}
