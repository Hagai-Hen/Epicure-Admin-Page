import { RestaurantInterface } from "../constants/interfaces";
import { getDishName } from "./dishesApi";

export const fetchRestaurants = async () => {
  try {
    const response = await fetch(`/api/restaurants/getall`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    const transformedData = await Promise.all(
      data.map(async (restaurant: RestaurantInterface) => {
        const dishesForRestaurant = await Promise.all(
          restaurant.dishes.map(async (dishId: string) => {
            const dishName = await getDishName(dishId) || "";
            return {
              id: dishId,
              name: dishName,
            };
          })
        );

        return {
          ...restaurant,
          dishes: dishesForRestaurant,
          id: restaurant._id,
          _id: undefined,
        };
      })
    );
    return transformedData;
  } catch (error) {
    console.error("Error getting restaurants:", (error as Error).message);
  }
};

export const getRestaurantName = async (id: string) => {
  try {
    const response = await fetch(`/api/restaurants/get/${id}`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.name;
  } catch (error) {
    console.error("Error getting restaurant name:", (error as Error).message);
  }
};

export const createRestaurant = async (restaurantData: string) => {
  try {
    const response = await fetch(`/api/restaurants/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error creating restaurant:", (error as Error).message);
  }
};

export const deleteRestaurant = async (id: string) => {
  try {
    const response = await fetch(`/api/restaurants/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error deleting restaurant:", (error as Error).message);
  }
};

export const updateRestaurant = async (restaurantData: RestaurantInterface) => {
  try {
    console.log("here", restaurantData);
    const response = await fetch(
      `/api/restaurants/update/${restaurantData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      }
    );
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Error updating restaurant:", (error as Error).message);
  }
};
