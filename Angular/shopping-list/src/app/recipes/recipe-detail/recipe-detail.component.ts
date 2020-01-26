import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../recipe-list/recipe.model";
import { Ingredient } from "src/shared/ingredient.model";
import { RecipesService } from "src/app/services/recipes.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipesService.getRecipeById(+params["id"]);
    });
  }

  addIngredientToShoppingList() {
    this.recipesService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe.id);
    this.router.navigate(["/recipes"]);
  }
}
