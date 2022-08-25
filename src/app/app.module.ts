import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditorModule } from 'primeng/editor';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

import { LandingComponent } from './pages/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInHeaderComponent } from './header/logged-in-header/logged-in-header.component';
import { LandingHeaderComponent } from './header/landing-header/landing-header.component';
import { AddIngredientComponent } from './pages/cooking/add-ingredient/add-ingredient.component';
import { CookingComponent } from './pages/cooking/cooking/cooking.component';
import { RequiredStarComponent } from './shared/form/required-star/required-star.component';
import { IngredientsComponent } from './cooking/ingredients/ingredients.component';
import { RecipesComponent } from './cooking/recipes/recipes.component';
import { AddRecipeComponent } from './pages/cooking/add-recipe/add-recipe.component';
import { RecipeComponent } from './cooking/recipe/recipe.component';
import { DeleteRecipeComponent } from './cooking/recipe/delete-recipe/delete-recipe.component';
import { ConfirmationService, MessageService } from 'primeng/api';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://loginfat.gorilly.digital',
        realm: 'assistant',
        clientId: 'frontend',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    RequiredStarComponent,
    LandingComponent,
    LoggedInHeaderComponent,
    LandingHeaderComponent,
    AddIngredientComponent,
    CookingComponent,
    IngredientsComponent,
    RecipesComponent,
    AddRecipeComponent,
    RecipeComponent,
    DeleteRecipeComponent
  ],
  imports: [
    ConfirmDialogModule,
    
    KeycloakAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StyleClassModule,
    HttpClientModule,
    ReactiveFormsModule,
    ContextMenuModule,
    MessagesModule,
    MessageModule,
    ToastModule,

    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputMaskModule,
    TableModule,
    EditorModule,

    DividerModule,
    InputTextareaModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
