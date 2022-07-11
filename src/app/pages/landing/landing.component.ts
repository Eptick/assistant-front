import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientsService } from 'src/app/api/cooking/ingredients.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private ingredientsService: IngredientsService,
  ) { }

  ngOnInit(): void {
    this.ingredientsService.getIngredients().subscribe(d => {
      console.info(d);
    })
  }

  login() {
    this.auth.login();
  }

}
