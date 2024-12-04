import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createChef, deleteChef, fetchChefs, updateChef } from "../../api/chefsApi";
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
  loading: boolean;
  error: string | null;
}

const initialState: ChefsState = {
  chefs: [{ id: "" }],
  loading: false,
  error: null,
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
      .addCase(getChefs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChefs.fulfilled, (state, action) => {
        state.chefs = action.payload;
        state.loading = false;
      })
      .addCase(getChefs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch chefs";
      })
      .addCase(CreateChef.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateChef.fulfilled, (state, action) => {
        state.chefs.push(action.payload);
        state.loading = false;
      })
      .addCase(CreateChef.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create chef";
      })
      .addCase(DeleteChef.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteChef.fulfilled, (state, action) => {
        state.chefs = state.chefs.filter(
          (chef) => chef.id !== action.payload.chef._id
        );
        state.loading = false;
      })
      .addCase(DeleteChef.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete chef";
      })
      .addCase(UpdateChef.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateChef.fulfilled, (state, action) => {
        const index = state.chefs.findIndex(
          (chef) => chef.id === action.payload.id
        );
        if (index !== -1) {
          state.chefs[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(UpdateChef.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update chef";
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

export const { setChefs } = chefsSlice.actions;
export default chefsSlice.reducer;
