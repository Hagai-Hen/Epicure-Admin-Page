import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DishesData } from "../../resources/content";

// Dish Interface
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
  dishes: DishesData,
};

const dishSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    // Action to set dishes (typically from an API call)
    setDishes: (state, action: PayloadAction<Dish[]>) => {
      state.dishes = action.payload;
    },
    // Action to add a new dish
    createDish: (state, action: PayloadAction<Dish>) => {
      state.dishes.push(action.payload);
    },
    // Action to update an existing dish
    updateDish: (state, action: PayloadAction<Dish>) => {
      const index = state.dishes.findIndex(
        (dish) => dish.id === action.payload.id
      );
      if (index !== -1) {
        state.dishes[index] = action.payload;
      }
    },
    // Action to delete a dish
    deleteDish: (state, action: PayloadAction<string>) => {
      state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
    },
  },
});

export const { setDishes, createDish, updateDish, deleteDish } = dishSlice.actions;
export default dishSlice.reducer;
