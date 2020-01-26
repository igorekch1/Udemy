import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe-list/recipe.model";
import { RecipesService } from "src/app/services/recipes.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Ingredient } from "src/shared/ingredient.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipesService.getRecipeById(+params["id"]);
      this.editMode = !!params["id"];
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = this.editMode ? this.recipe.name : "";
    let recipeImagePath = this.editMode ? this.recipe.imagePath : "";
    let recipeDescription = this.editMode ? this.recipe.description : "";
    let recipeIngredients =
      this.editMode && this.recipe.ingredients
        ? this.recipe.ingredients.map((ingredient: Ingredient) => {
            return new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            });
          })
        : [];

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: new FormArray(recipeIngredients)
    });
  }

  onAddIngredient() {
    (this.recipeForm.get("ingredients") as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onSubmit() {
    const newRecipe = new Recipe(
      Math.random() * 10,
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );
    if (this.editMode) {
      this.recipesService.updateRecipe(+this.recipe.id, newRecipe);
    } else {
      this.recipesService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  removeIngredient(index: number) {
    (this.recipeForm.get("ingredients") as FormArray).removeAt(index);
  }
}
