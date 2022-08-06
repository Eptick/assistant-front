import { Ingredient } from "./ingredient.types"

export type Recipe = {
  uuid: string,
  name: string,
  ingredients: Ingredient[],
}
