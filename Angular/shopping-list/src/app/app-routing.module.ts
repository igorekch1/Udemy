import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResoverService } from "./recipes/recipes-resolver.service";

const appRouts: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    children: [
      {
        path: "",
        component: RecipeStartComponent
      },
      {
        path: "new",
        component: RecipeEditComponent
      },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipeResoverService]
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipeResoverService]
      }
    ]
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
