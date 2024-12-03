import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChefsData } from "../../resources/content";

// Updated Chef Interface
interface Chef {
  id: string;
  name: string;
  img: string;
  description: string;
  restaurants: string[]; // Assuming restaurants are IDs or names
}

interface ChefsState {
  chefs: Chef[];
}

const initialState: ChefsState = {
  chefs: ChefsData,
};

const chefsSlice = createSlice({
  name: "chefs",
  initialState,
  reducers: {
    // Action to set the chefs (usually from an API call or initial state)
    setChefs: (state, action: PayloadAction<Chef[]>) => {
      state.chefs = action.payload;
    },
    // Action to add a new chef
    createChef: (state, action: PayloadAction<Chef>) => {
      state.chefs.push(action.payload);
    },
    // Action to update an existing chef
    updateChef: (state, action: PayloadAction<Chef>) => {
      const index = state.chefs.findIndex((chef) => chef.id === action.payload.id);
      if (index !== -1) {
        state.chefs[index] = action.payload;
      }
    },
    // Action to delete a chef
    deleteChef: (state, action: PayloadAction<string>) => {
      state.chefs = state.chefs.filter((chef) => chef.id !== action.payload);
    },
  },
});

export const { setChefs, createChef, updateChef, deleteChef } = chefsSlice.actions;
export default chefsSlice.reducer;
