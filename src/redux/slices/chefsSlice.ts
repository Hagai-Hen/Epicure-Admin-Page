import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {createChef, deleteChef, fetchChefs, updateChef} from "../../api/fetchChefs";
import { ChefInterface } from "../../constants/interfaces";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChefs.pending, () => {
        console.log("getChefs.pending");
      })
      .addCase(getChefs.fulfilled, (state, action) => {
        console.log("getChefs.fulfilled")
        state.chefs = action.payload;
      })
      .addCase(CreateChef.pending, () => {
        console.log("createChef.pending");
      })
      .addCase(CreateChef.fulfilled, (state, action) => {
        state.chefs.push(action.payload);
        console.log("createChef.fulfilled");
      })
      .addCase(DeleteChef.pending, () => {
        console.log("deleteChef.pending");
      })
      .addCase(DeleteChef.fulfilled, (state, action) => {
        state.chefs = state.chefs.filter(
          (chef) => chef.id !== action.payload.chef._id
        );
        console.log("deleteChef.fulfilled");
      })
      .addCase(UpdateChef.pending, () => {
        console.log("updateChef.pending");
      })
      .addCase(UpdateChef.fulfilled, (state, action) => {
        const index = state.chefs.findIndex(
          (chef) => chef.id === action.payload.id
        );
        if (index !== -1) {
          state.chefs[index] = action.payload;
        }
        console.log("updateChef.fulfilled");
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

export const CreateChef = createAsyncThunk(
  "chefs/create",
  async (chefData: ChefInterface) => {
    const chef = await createChef(chefData);
    return chef;
  }
);

export const DeleteChef = createAsyncThunk(
  "chefs/delete",
  async (id: string) => {
    const chef = await deleteChef(id);
    return chef;
  }
);

export const UpdateChef = createAsyncThunk(
  "chefs/update",
  async (chefData: ChefInterface) => {
    const chef = await updateChef(chefData);
    return chef;
  }
);

export const { setChefs } =
  chefsSlice.actions;
export default chefsSlice.reducer;
