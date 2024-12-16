export const getDishName = async (id: string) => {
  try {
    const response = await fetch(`/api/dishes/get/${id}`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.name;
  } catch (error) {
    console.log("Error getting dish name:", (error as Error).message);
  }
};