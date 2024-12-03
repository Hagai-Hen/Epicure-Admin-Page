import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantsData } from "../../resources/content";

// Restaurant Interface
interface Restaurant {
  id: string;
  name: string;
  img: string;
  chef_name: string;
  rate: number;
  dishes: string[]; // Assuming dishes are IDs or names of dishes
}

interface RestaurantsState {
  restaurants: Restaurant[];
}

const initialState: RestaurantsState = {
  restaurants: RestaurantsData,
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    // Action to set the restaurants (usually from an API call or initial state)
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    // Action to add a new restaurant
    createRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurants.push(action.payload);
    },
    // Action to update an existing restaurant
    updateRestaurant: (state, action: PayloadAction<Restaurant>) => {
      const index = state.restaurants.findIndex((restaurant) => restaurant.id === action.payload.id);
      if (index !== -1) {
        state.restaurants[index] = action.payload;
      }
    },
    // Action to delete a restaurant
    deleteRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter((restaurant) => restaurant.id !== action.payload);
    },
  },
});

export const { setRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;