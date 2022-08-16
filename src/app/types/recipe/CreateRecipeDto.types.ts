export type CreateRecipeDto = {
    name: string,
    description: string,
    ingredients: {ingredientUUID: string, quantity: string}[],
}
