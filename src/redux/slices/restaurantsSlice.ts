import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRestaurants } from "../../api/fetchRestaurants";

interface Restaurant {
  id: string;
  name?: string;
  img?: string;
  chef_name?: string;
  rate?: number;
  dishes?: string[];
}

interface RestaurantsState {
  restaurants: Restaurant[];
}

const initialState: RestaurantsState = {
  restaurants: [{id: ''}],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    createRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurants.push(action.payload);
    },
    updateRestaurant: (state, action: PayloadAction<Restaurant>) => {
      const index = state.restaurants.findIndex(
        (restaurant) => restaurant.id === action.payload.id
      );
      if (index !== -1) {
        state.restaurants[index] = action.payload;
      }
    },
    deleteRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter(
        (restaurant) => restaurant.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.pending, () => {
        console.log("getRestaurants.pending");
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        console.log("getRestaurants.fulfilled")
        state.restaurants = action.payload;
      });
  },
});

export const getRestaurants = createAsyncThunk(
  "restaurants/getall",
  async () => {
    const restaurants = await fetchRestaurants();
    return restaurants;
  }
);

export const {
  setRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
