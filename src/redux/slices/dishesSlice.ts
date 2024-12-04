import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDishes,
  createDish,
  deleteDish,
  updateDish,
} from "../../api/dishesApi";
import { DishInterface } from "../../constants/interfaces";

interface Dish {
  id: string;
  name?: string;
  img?: string;
  price?: number;
  ingredients?: string;
  restaurant?: string;
  tags?: string[];
}

interface DishesState {
  dishes: Dish[];
  loading: boolean;
  error: string | null;
}

const initialState: DishesState = {
  dishes: [{ id: "" }],
  loading: false,
  error: null,
};

const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<Dish[]>) => {
      state.dishes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        state.dishes = action.payload;
        state.loading = false;
      })
      .addCase(getDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch dishes";
      })
      .addCase(CreateDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateDish.fulfilled, (state, action) => {
        state.dishes.push(action.payload);
        state.loading = false;
      })
      .addCase(CreateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create dish";
      })
      .addCase(DeleteDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteDish.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter(
          (dish) => dish.id !== action.payload.dish._id
        );
        state.loading = false;
      })
      .addCase(DeleteDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete dish";
      })
      .addCase(UpdateDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateDish.fulfilled, (state, action) => {
        const index = state.dishes.findIndex(
          (dish) => dish.id === action.payload.id
        );
        if (index !== -1) {
          state.dishes[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(UpdateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update dish";
      });
  },
});

export const getDishes = createAsyncThunk("dishes/getall", async () => {
  const dishes = await fetchDishes();
  return dishes;
});

export const CreateDish = createAsyncThunk(
  "dishes/create",
  async (dishData: DishInterface) => {
    const dish = await createDish(dishData);
    return dish;
  }
);

export const DeleteDish = createAsyncThunk(
  "dishes/delete",
  async (id: string) => {
    const dish = await deleteDish(id);
    return dish;
  }
);

export const UpdateDish = createAsyncThunk(
  "dishes/update",
  async (dishData: DishInterface) => {
    const dish = await updateDish(dishData);
    return dish;
  }
);

export const { setDishes } = dishSlice.actions;
export default dishSlice.reducer;
