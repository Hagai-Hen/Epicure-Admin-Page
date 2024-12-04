import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchDishes from "../../api/fetchDishes";

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
}

const initialState: DishesState = {
  dishes: [{ id: "" }],
};

const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<Dish[]>) => {
      state.dishes = action.payload;
    },
    createDish: (state, action: PayloadAction<Dish>) => {
      state.dishes.push(action.payload);
    },
    updateDish: (state, action: PayloadAction<Dish>) => {
      const index = state.dishes.findIndex(
        (dish) => dish.id === action.payload.id
      );
      if (index !== -1) {
        state.dishes[index] = action.payload;
      }
    },
    deleteDish: (state, action: PayloadAction<string>) => {
      state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, () => {
        console.log("getDishes.pending");
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        console.log("getDishes.fulfilled");
        state.dishes = action.payload;
      });
  },
});

export const getDishes = createAsyncThunk("dishes/getall", async () => {
  const dishes = await fetchDishes();
  return dishes;
});

export const { setDishes, createDish, updateDish, deleteDish } =
  dishSlice.actions;
export default dishSlice.reducer;
