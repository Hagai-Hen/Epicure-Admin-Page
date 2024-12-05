import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COLLECTIONS_DATA } from "../../resources/content";

interface Dish {
  id: string;
  name: string;
  img?: string;
  price: number;
  ingredients: string;
  restaurant: string;
  tags: string[];
}

interface DishesState {
  dishes: Dish[];
}

const initialState: DishesState = {
  dishes: COLLECTIONS_DATA.DISHES.data,
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
});

export const { setDishes, createDish, updateDish, deleteDish } =
  dishSlice.actions;
export default dishSlice.reducer;
