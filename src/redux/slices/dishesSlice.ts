import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDishes, createDish, deleteDish, updateDish } from "../../api/fetchDishes";
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, () => {
        console.log("getDishes.pending");
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        console.log("getDishes.fulfilled");
        state.dishes = action.payload;
      })
      .addCase(CreateDish.pending, () => {
        console.log("createDish.pending");
      })
      .addCase(CreateDish.fulfilled, (state, action) => {
        state.dishes.push(action.payload);
        console.log("createDish.fulfilled");
      })
      .addCase(DeleteDish.pending, () => {
        console.log("deleteDish.pending");
      })
      .addCase(DeleteDish.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter(
          (dish) => dish.id !== action.payload.dish._id
        );
        console.log("deleteDish.fulfilled");
      })
      .addCase(UpdateDish.pending, () => {
        console.log("updateDish.pending");
      })
      .addCase(UpdateDish.fulfilled, (state, action) => {
        const index = state.dishes.findIndex(
          (dish) => dish.id === action.payload.id
        );
        if (index !== -1) {
          state.dishes[index] = action.payload;
        }
        console.log("updateDish.fulfilled");
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
