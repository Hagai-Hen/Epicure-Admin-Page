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
    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
  }
};

export const deleteRestaurant = async (id: string) => {
  try {
    console.log("hey", id)
    const response = await fetch(`/api/restaurants/delete/${id}`, {
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
    console.error("Error deleting restaurant:", error);
  }
};

export const updateRestaurant = async (restaurantData: RestaurantInterface) => {
  try {
    const response = await fetch(`/api/restaurants/update/${restaurantData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),

    });
    const data = await response.json();

    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error updating restaurant:", error);
  }
};
