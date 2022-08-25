import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, EMPTY } from 'rxjs';
import { RecipesService } from 'src/app/api/cooking/recipes.service';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.scss']
})
export class DeleteRecipeComponent {

  @Input()
  public uuid: string = ""

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private recipesService: RecipesService,
    private router: Router,
  ) {}

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
              console.log("accepted action", this.uuid)
              this.recipesService.deleteRecipe(this.uuid)
              .pipe(catchError(e => {
                this.messageService.add({severity:'error', summary:'failed to Deleted the recipe', detail:'ode u kurac'});
                return EMPTY
              }))
              .subscribe(() => {
                debugger
                this.messageService.add({severity:'success', summary:'Deleted the recipe', detail:'ode u kurac'});
                this.router.navigate(['/cooking'], {replaceUrl: true});
              })
            }
        });
    }

}
