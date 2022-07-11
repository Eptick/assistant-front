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

import { LandingComponent } from './pages/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInHeaderComponent } from './header/logged-in-header/logged-in-header.component';
import { LandingHeaderComponent } from './header/landing-header/landing-header.component';
import { AddIngredientComponent } from './pages/cooking/add-ingredient/add-ingredient.component';
import { CookingComponent } from './pages/cooking/cooking/cooking.component';
import { RequiredStarComponent } from './shared/form/required-star/required-star.component';
import { IngredientsComponent } from './cooking/ingredients/ingredients.component';

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
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StyleClassModule,
    HttpClientModule,
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputMaskModule,
    TableModule,

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
