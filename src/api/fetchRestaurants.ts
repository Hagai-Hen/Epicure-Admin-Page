import { RestaurantInterface } from "../constants/interfaces";

export const fetchRestaurants = async () => {
  try {
    const response = await fetch(`/api/restaurants/getall`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    const transformedData = data.map((restaurant: RestaurantInterface) => {
      return { ...restaurant, id: restaurant._id, _id: undefined };
    });
    return transformedData;
  } catch (error) {
    console.log("Error getting restaurants:", (error as Error).message);
  }
};

export default fetchRestaurants;
