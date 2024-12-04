import { ChefInterface } from "../constants/interfaces";

export const fetchChefs = async () => {
  try {
    const response = await fetch(`/api/chefs/getall`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    const transformedData = data.map((chef: ChefInterface) => {
      return { ...chef, id: chef._id, _id: undefined };
    });
    return transformedData;
  } catch (error) {
    console.log("Error getting chefs:", (error as Error).message);
  }
};

export default fetchChefs;
