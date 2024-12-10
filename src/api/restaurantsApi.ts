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