export interface DishInterface {
  _id: string;
  id: string;
  name: string;
  price: number;
  ingredients: string;
  tags: string[];
  restaurant: string;
  img?: string;
}

export interface RestaurantInterface {
  _id: string;
  id: string;
  name: string;
  img: string;
  chef: string;
  dishes: string[];
}

export interface ChefInterface {
  _id: string;
  id: string;
  name: string;
  img: string;
  description: string;
  restaurants: string[];
}
