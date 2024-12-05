import { configureStore } from "@reduxjs/toolkit";
import chefsReducer from "./slices/chefsSlice";
import restaurantsReducer from "./slices/restaurantsSlice";
import dishesReducer from "./slices/dishesSlice";

const store = configureStore({
  reducer: {
    chefs: chefsReducer,
    restaurants: restaurantsReducer,
    dishes: dishesReducer,
  },
});

export default store;
