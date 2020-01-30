import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class UpdateIgredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: { index: number; ingredient: Ingredient }) {}
}

export class RemoveIngredient implements Action {
  readonly type = REMOVE_INGREDIENT;

  constructor(public payload: number) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export type Actions =
  | AddIngredient
  | AddIngredients
  | UpdateIgredient
  | RemoveIngredient;
