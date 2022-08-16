import { Ingredient } from "./ingredient.types";

export type RecipeIngredient = {
  uuid: string,
  ingredient: Ingredient,
  quantity: string,
}
