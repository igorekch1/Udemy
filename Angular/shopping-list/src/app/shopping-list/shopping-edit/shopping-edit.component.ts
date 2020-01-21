import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Ingredient } from "src/shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @Output() createdIngredient = new EventEmitter<Ingredient>();
  ingredientName: string = "";
  ingredientAmount: string = "";

  constructor() {}

  ngOnInit() {}

  addIngredient() {
    const newIngredient = new Ingredient(
      this.ingredientName,
      parseInt(this.ingredientAmount)
    );
    this.createdIngredient.emit(newIngredient);
  }

  reset() {
    this.ingredientName = "";
    this.ingredientAmount = "";
  }
}
