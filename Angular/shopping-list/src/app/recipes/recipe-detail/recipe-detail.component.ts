import { Component, Input } from "@angular/core";
import { Recipe } from "../recipe-list/recipe.model";
import { Ingredient } from "src/shared/ingredient.model";
import { RecipesService } from "src/app/services/recipes.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) {}

  addIngredientToShoppingList() {
    this.recipesService.addIngredients(this.recipe.ingredients);
  }
}
