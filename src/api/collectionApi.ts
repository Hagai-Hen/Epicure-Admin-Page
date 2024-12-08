import { getDishName } from "./dishesApi";
import { getRestaurantName } from "./restaurantsApi";

export const fetchData = async (collection: string) => {
  try {
    const response = await fetch(`/api/${collection}/getall`);
    console.log("collection", collection);
    const data = await response.json();
    console.log("data", data);

    if (data.error) {
      throw new Error(data.error);
    }

    const transformedData = await Promise.all(
      data?.map(async (item: any) => {
        const dishesForRestaurant = item?.dishes
          ? await Promise.all(
              item.dishes.map(async (dishId: string) => {
                const dishName = (await getDishName(dishId)) || "";
                return {
                  id: dishId,
                  name: dishName,
                };
              })
            )
          : [];

        const restaurantsForItem = item?.restaurants
          ? await Promise.all(
              item.restaurants.map(async (restId: string) => {
                const restName = (await getRestaurantName(restId)) || "";
                return {
                  id: restId,
                  name: restName,
                };
              })
            )
          : [];

          let restaurantNameForDish = null;
        if (item?.restaurant) {
          const restaurantName = await getRestaurantName(item.restaurant);
          restaurantNameForDish = {
            id: item.restaurant,
            name: restaurantName || "",
          };
        }
        return {
          ...item,
          dishes: dishesForRestaurant,
          restaurants: restaurantsForItem,
          restaurant: restaurantNameForDish,
          id: item._id,
          _id: undefined,
        };
      })
    );

    console.log(transformedData);

    return transformedData;
  } catch (error) {
    console.log(`Error getting ${collection}:`, (error as Error).message);
  }
};

export const createItem = async (collection: string, itemData: any) => {
  try {
    if (itemData.tags && !Array.isArray(itemData.tags)) {
      itemData.tags = [itemData.tags];
    }
    const response = await fetch(`/api/${collection}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    const data = await response.json();
    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }

    return data;
  } catch (error) {
    console.error(`Error creating ${collection}:`, error);
  }
};

export const deleteItem = async (collection: string, id: string) => {
  try {
    const response = await fetch(`/api/${collection}/delete/${id}`, {
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
    console.error(`Error deleting ${collection}:`, error);
  }
};

export const editItem = async (collection: string, itemData: any) => {
  try {
    if (itemData.tags && !Array.isArray(itemData.tags)) {
      itemData.tags = [itemData.tags];
    }
    const response = await fetch(`/api/${collection}/update/${itemData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    const data = await response.json();

    if (data._id) {
      data.id = data._id;
      data._id = undefined;
    }
    return data;
  } catch (error) {
    console.error(`Error updating ${collection}:`, error);
  }
};
