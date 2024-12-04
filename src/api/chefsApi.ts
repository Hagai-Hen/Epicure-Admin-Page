import { ChefInterface } from "../constants/interfaces";
import { getRestaurantName } from "./restaurantsApi";

export const fetchChefs = async () => {
  try {
    const response = await fetch(`/api/chefs/getall`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    const transformedData = await Promise.all(
      data.map(async (chef: ChefInterface) => {
        const restaurantNamesForChef = await Promise.all(
          chef.restaurants.map(async (restaurantId: string) => {
            const dishName = await getRestaurantName(restaurantId) || "Can't find restaurant's name";
            return dishName;
          })
        );

        return {
          ...chef,
          restaurants: restaurantNamesForChef,
          id: chef._id,
          _id: undefined,
        };
      })
    );

    return transformedData;
  } catch (error) {
    console.log("Error getting chefs:", (error as Error).message);
  }
};

export const createChef = async (chefData: ChefInterface) => {
  try {
    
    const response = await fetch(`/api/chefs/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chefData),
    });
    const data = await response.json();
    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error creating chef:", error);
  }
};

export const deleteChef = async (id: string) => {
  try {
    const response = await fetch(`/api/chefs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error deleting chef:", error);
  }
};

export const updateChef = async (chefData: ChefInterface) => {
  try {

    const response = await fetch(`/api/chefs/update/${chefData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chefData),
    });
    const data = await response.json();

    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error updating chef:", error);
  }
};

