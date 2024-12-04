import { DishInterface } from "../constants/interfaces";

export const fetchDishes = async () => {
  try {
    const response = await fetch(`/api/dishes/getall`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    const transformedData = data.map((dish: DishInterface) => {
      return { ...dish, id: dish._id, _id: undefined };
    });
    return transformedData;
  } catch (error) {
    console.log("Error getting dishes:", (error as Error).message);
  }
};

export default fetchDishes;
