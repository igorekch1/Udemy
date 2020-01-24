import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "./recipe-list/recipe.model";
import { RecipesService } from "../services/recipes.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  selectRecipeSubscribtion: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.selectRecipeSubscribtion = this.recipesService.selectedRecipe.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

  ngOnDestroy() {
    this.selectRecipeSubscribtion.unsubscribe();
  }
}
