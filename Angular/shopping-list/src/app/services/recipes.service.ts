import { Recipe } from "../recipes/recipe-list/recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "src/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipesService {
  selectedRecipe = new Subject<Recipe>();

  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  onRecipeSelect(recipe: Recipe) {
    this.selectedRecipe.next(recipe);
  }

  getRecipeById(id: number) {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}
