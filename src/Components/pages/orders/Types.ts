export interface MealType{
    id          : string,
    name        : string,
}

export interface MealSizeType{
    id          : string,
    price       : string,
    name        : string
}
export interface CartItemType {
  id          : string, // unique cart id (mealId-variantId)
  count       : number,
  comment     : string,
  size        : MealSizeType,
  meal        : MealType,
}


export interface OrderType{
  id          : string,
  
}