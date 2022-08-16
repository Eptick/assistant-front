import { RecipeIngredient } from "./recipe-ingredient"

export type Recipe = {
  uuid: string,
  name: string,
  ingredients: RecipeIngredient[],
  description: string,
}
