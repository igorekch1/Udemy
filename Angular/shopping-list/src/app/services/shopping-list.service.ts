import { Ingredient } from "src/shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Bananas", 10)
  ];

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
