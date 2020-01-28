import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe-list/recipe.model";
import { DataStorage } from "src/shared/data-storage.service";
import { RecipesService } from "../services/recipes.service";

@Injectable({ providedIn: "root" })
export class RecipeResoverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorage,
    private recipesService: RecipesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipesService.recipes;

    if (!recipes.length) return this.dataStorage.fetchData();

    return recipes;
  }
}
