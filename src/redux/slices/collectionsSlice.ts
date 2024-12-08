import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRestaurant,
  fetchRestaurants,
  deleteRestaurant,
  updateRestaurant,
} from "../../api/restaurantsApi";
import { ChefInterface, DishInterface, RestaurantInterface } from "../../constants/interfaces";
import { createDish, deleteDish, fetchDishes, updateDish } from "../../api/dishesApi";
import { createChef, deleteChef, fetchChefs, updateChef } from "../../api/chefsApi";

interface Item {
  id: string;
  name?: string;
  img?: string;
  chef_name?: string;
  rate?: number;
  dishes?: string[];
}

interface CollectionsState {
  [key: string]: {
    items: Item[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: CollectionsState = {
  restaurants: { items: [{ id: "" }], loading: false, error: null },
  // other collections like 'chefs', 'dishes' can be added here
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollectionData: (
      state,
      action: PayloadAction<{ collection: string; data: Item[] }>
    ) => {
      const { collection, data } = action.payload;
      state[collection] = {
        ...state[collection],
        items: data,
      };
    },
    addItem: (
      state,
      action: PayloadAction<{ collection: string; item: Item }>
    ) => {
      const { collection, item } = action.payload;
      state[collection].items.push(item);
    },
    removeItem: (
      state,
      action: PayloadAction<{ collection: string; id: string }>
    ) => {
      const { collection, id } = action.payload;
      state[collection].items = state[collection].items.filter(
        (item) => item.id !== id
      );
    },
    updateItem: (
      state,
      action: PayloadAction<{ collection: string; item: Item }>
    ) => {
      const { collection, item } = action.payload;
      const index = state[collection].items.findIndex(
        (existingItem) => existingItem.id === item.id
      );
      if (index !== -1) {
        state[collection].items[index] = item;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.pending, (state, action) => {
        const collection = action.meta.arg;
        state[collection] = { ...state[collection], loading: true, error: null };
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        const { collection, data } = action.payload;
        state[collection] = { ...state[collection], items: data, loading: false };
      })
      .addCase(getCollection.rejected, (state, action) => {
        const collection = action.meta.arg;
        state[collection] = { ...state[collection], loading: false, error: action.error.message || `Failed to fetch ${collection}` };
      })
      .addCase(createCollectionItem.pending, (state, action) => {
        const collection = action.meta.arg.collection;
        state[collection] = { ...state[collection], loading: true, error: null };
      })
      .addCase(createCollectionItem.fulfilled, (state, action) => {
        const { collection, item } = action.payload;
        state[collection].items.push(item);
        state[collection].loading = false;
      })
      .addCase(createCollectionItem.rejected, (state, action) => {
        const collection = action.meta.arg.collection;
        state[collection] = { ...state[collection], loading: false, error: action.error.message || `Failed to create ${collection}` };
      })
      .addCase(deleteCollectionItem.pending, (state, action) => {
        const collection = action.meta.arg.collection;
        state[collection] = { ...state[collection], loading: true, error: null };
      })
      .addCase(deleteCollectionItem.fulfilled, (state, action) => {
        const { collection, id } = action.payload;
        state[collection].items = state[collection].items.filter((item) => item.id !== id);
        state[collection].loading = false;
      })
      .addCase(deleteCollectionItem.rejected, (state, action) => {
        const collection = action.meta.arg.collection;
        state[collection] = { ...state[collection], loading: false, error: action.error.message || `Failed to delete ${collection}` };
      })
      .addCase(updateCollectionItem.pending, (state, action) => {
        const collection = action.meta.arg.collection;
        state[collection] = { ...state[collection], loading: true, error: null };
      })
      .addCase(updateCollectionItem.fulfilled, (state, action) => {
        const { collection, item } = action.payload;
        const index = state[collection].items.findIndex((existingItem) => existingItem.id === item.id);
        if (index !== -1) {
          state[collection].items[index] = item;
        }
        state[collection].loading = false;
      })
      .addCase(updateCollectionItem.rejected, (state, action) => {
        const collection = action.meta.arg.collection;
        state[collection] = { ...state[collection], loading: false, error: action.error.message || `Failed to update ${collection}` };
      });
  },
});

// Thunks for generalized collection actions:
export const getCollection = createAsyncThunk(
  "collections/get",
  async (collection: string) => {
    if (collection === "restaurants") {
      return { collection, data: await fetchRestaurants() };
    }
    if (collection === "chefs") {
      return { collection, data: await fetchChefs() };
    }
    if (collection === "dishes") {
      return { collection, data: await fetchDishes() };
    }
    return { collection, data: [] };
  }
);

export const createCollectionItem = createAsyncThunk(
  "collections/create",
  async ({ collection, item }: { collection: string; item: any }) => {
    if (collection === "restaurants") {
      return { collection, item: await createRestaurant(item as RestaurantInterface) };
    }
    if (collection === "chefs") {
      return { collection, item: await createChef(item as ChefInterface) };
    }
    if (collection === "dishes") {
      return { collection, item: await createDish(item as DishInterface) };
    }
    return { collection, item };
  }
);

export const deleteCollectionItem = createAsyncThunk(
  "collections/delete",
  async ({ collection, id }: { collection: string; id: string }) => {
    if (collection === "restaurants") {
      await deleteRestaurant(id);
    }
    if (collection === "chefs") {
      return { collection, item: await deleteChef(id) };
    }
    if (collection === "dishes") {
      return { collection, item: await deleteDish(id) };
    }
    return { collection, id };
  }
);

export const updateCollectionItem = createAsyncThunk(
  "collections/update",
  async ({ collection, item }: { collection: string; item: Item }) => {
    if (collection === "restaurants") {
      return { collection, item: await updateRestaurant(item as RestaurantInterface) };
    }
    if (collection === "chefs") {
      return { collection, item: await updateChef(item as ChefInterface) };
    }
    if (collection === "dishes") {
      return { collection, item: await updateDish(item as DishInterface) };
    }
    return { collection, item };
  }
);

export const { setCollectionData, addItem, removeItem, updateItem } = collectionsSlice.actions;

export default collectionsSlice.reducer;
