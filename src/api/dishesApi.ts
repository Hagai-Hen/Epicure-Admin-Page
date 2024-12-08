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

export const createDish = async (dishData: DishInterface) => {
  try {
    if (dishData.tags && !Array.isArray(dishData.tags)) {
      dishData.tags = [dishData.tags];
    }
    const response = await fetch(`/api/dishes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dishData),
    });
    const data = await response.json();

    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error creating dish:", error);
  }
};

export const deleteDish = async (id: string) => {
  try {
    const response = await fetch(`/api/dishes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.id) {
      data._id = data.id;
    }
    return data;
  } catch (error) {
    console.error("Error deleting dish:", error);
  }
};

export const updateDish = async (dishData: DishInterface) => {
  try {
    const response = await fetch(`/api/dishes/update/${dishData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dishData),
    });
    const data = await response.json();

    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error("Error updating dish:", error);
  }
};
