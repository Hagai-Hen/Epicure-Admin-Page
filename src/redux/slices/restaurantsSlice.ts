import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRestaurant,
  fetchRestaurants,
  deleteRestaurant,
  updateRestaurant,
} from "../../api/restaurantsApi";
import { RestaurantInterface } from "../../constants/interfaces";

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
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [{ id: "" }],
  loading: false,
  error: null,
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
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.loading = false;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch restaurants";
      })
      .addCase(CreateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateRestaurant.fulfilled, (state, action) => {
        state.restaurants.push(action.payload);
        state.loading = false;
      })
      .addCase(CreateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create restaurant";
      })
      .addCase(DeleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload.restaurant._id
        );
        state.loading = false;
      })
      .addCase(DeleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete restaurant";
      })
      .addCase(UpdateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateRestaurant.fulfilled, (state, action) => {
        const index = state.restaurants.findIndex(
          (restaurant) => restaurant.id === action.payload.id
        );
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(UpdateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update restaurant";
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
  async (restaurantData: RestaurantInterface) => {
    const restaurant = await updateRestaurant(restaurantData);
    return restaurant;
  }
);

export const { setRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
