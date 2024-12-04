import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchChefs from "../../api/fetchChefs";

interface Chef {
  id: string;
  name?: string;
  img?: string;
  description?: string;
  restaurants?: string[];
}

interface ChefsState {
  chefs: Chef[];
}

const initialState: ChefsState = {
  chefs: [{id: ''}],
};

const chefsSlice = createSlice({
  name: "chefs",
  initialState,
  reducers: {
    setChefs: (state, action: PayloadAction<Chef[]>) => {
      state.chefs = action.payload;
    },
    createChef: (state, action: PayloadAction<Chef>) => {
      state.chefs.push(action.payload);
    },
    updateChef: (state, action: PayloadAction<Chef>) => {
      const index = state.chefs.findIndex(
        (chef) => chef.id === action.payload.id
      );
      if (index !== -1) {
        state.chefs[index] = action.payload;
      }
    },
    deleteChef: (state, action: PayloadAction<string>) => {
      state.chefs = state.chefs.filter((chef) => chef.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChefs.pending, () => {
        console.log("getChefs.pending");
      })
      .addCase(getChefs.fulfilled, (state, action) => {
        console.log("getChefs.fulfilled")
        state.chefs = action.payload;
      });
  },
});

export const getChefs = createAsyncThunk(
  "chefs/getall",
  async () => {
    const chefs = await fetchChefs();
    return chefs;
  }
);

export const { setChefs, createChef, updateChef, deleteChef } =
  chefsSlice.actions;
export default chefsSlice.reducer;
