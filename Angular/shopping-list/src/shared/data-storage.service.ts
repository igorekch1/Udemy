import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipesService } from "src/app/services/recipes.service";
import { Recipe } from "src/app/recipes/recipe-list/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataStorage {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  fetchData() {
    return this.http
      .get<Recipe[]>("https://shopping-list-ba677.firebaseio.com/recipes.json")
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients || [] };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  saveData() {
    const recipes = this.recipeService.recipes;
    this.http
      .put("https://shopping-list-ba677.firebaseio.com/recipes.json", recipes)
      .subscribe();
  }
}
