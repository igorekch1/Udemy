import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipe-list/recipe.model";
import { RecipesService } from "../services/recipes.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService) {
    this.recipesService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
