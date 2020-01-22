import { Component, OnInit } from "@angular/core";
import { Ingredient } from "src/shared/ingredient.model";
import { ShoppingListService } from "src/app/services/shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  ingredientName: string = "";
  ingredientAmount: string = "";

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  addIngredient() {
    const newIngredient = new Ingredient(
      this.ingredientName,
      parseInt(this.ingredientAmount)
    );
    this.shoppingListService.addIngredient(newIngredient);
  }

  reset() {
    this.ingredientName = "";
    this.ingredientAmount = "";
  }
}
