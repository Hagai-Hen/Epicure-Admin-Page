import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRestaurant,
  fetchRestaurants,
  deleteRestaurant,
  updateRestaurant,
} from "../../api/fetchRestaurants";

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
  restaurants: [{ id: "" }],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.pending, () => {
        console.log("getRestaurants.pending");
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        console.log("getRestaurants.fulfilled");
        state.restaurants = action.payload;
      })
      .addCase(CreateRestaurant.pending, () => {
        console.log("createRestaurants.pending");
      })
      .addCase(CreateRestaurant.fulfilled, (state, action) => {
        state.restaurants.push(action.payload);
        console.log("createRestaurants.fulfilled");
      })
      .addCase(DeleteRestaurant.pending, () => {
        console.log("deleteRestaurants.pending");
      })
      .addCase(DeleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload.restaurant._id
        );
        console.log("deleteRestaurants.fulfilled");
      })
      .addCase(UpdateRestaurant.pending, () => {
        console.log("updateRestaurants.pending");
      })
      .addCase(UpdateRestaurant.fulfilled, (state, action) => {
        const index = state.restaurants.findIndex(
          (restaurant) => restaurant.id === action.payload.id
        );
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }
        console.log("updateRestaurants.fulfilled");
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

export const CreateRestaurant = createAsyncThunk(
  "restaurants/create",
  async (restaurantData: string) => {
    const restaurant = await createRestaurant(restaurantData);
    return restaurant;
  }
);

export const DeleteRestaurant = createAsyncThunk(
  "restaurants/delete",
  async (id: string) => {
    const restaurant = await deleteRestaurant(id);
    return restaurant;
  }
);

export const UpdateRestaurant = createAsyncThunk(
  "restaurants/update",
  async (restaurantData) => {
    const restaurant = await updateRestaurant(restaurantData);
    return restaurant;
  }
);

export const { setRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
