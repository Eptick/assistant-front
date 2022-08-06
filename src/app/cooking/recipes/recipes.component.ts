import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { RecipesService } from 'src/app/api/cooking/recipes.service';
import { Recipe } from 'src/app/types/shared/recipe.types';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  data: Recipe[] = [];

  totalRecords: number = 0;

  cols: any[] = [];

  loading: boolean = true;

  selectAll: boolean = false;

  @Input()  selected!: Recipe[];
  @Output() selectedChange = new EventEmitter<Recipe[]>();

  contextMenu: MenuItem[] = [];
  contextSelection?: Recipe;

  constructor(private dataService: RecipesService) { }

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
    this.dataService.getRecipes(name).subscribe(res => {
        this.data = res.content;
        this.totalRecords = res.numberOfElements;
        this.loading = false;
    })
  }

  onSelectionChange(value = []) {
      this.selectAll = value.length === this.totalRecords;
      this.selectedChange.emit(value);
  }

  onSelectAllChange(event: any) {
      const checked = event.checked;

      if (checked) {
          this.dataService.getRecipes().subscribe(res => {
              this.selectedChange.emit(res.cotent);
              this.selectAll = true;
          });
      }
      else {
          this.selectedChange.emit([]);
          this.selected = [];
          this.selectAll = false;
      }
  }

  deleteItem() {
    const uuid: string | undefined = this.contextSelection?.uuid;
    if(!uuid) throw new Error("No uuid");
    this.dataService.deleteRecipe(uuid).subscribe();
  }
}
