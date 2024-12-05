import { fetchChefs } from "../api/chefsApi";
import { fetchDishes } from "../api/dishesApi";
import { fetchRestaurants } from "../api/restaurantsApi";
import {
  renderImgCell,
  renderActionsCell,
} from "../components/Dashboard/columns";

export const SIDE_BAR = {
  COLLECTIONS: ["Restaurants", "Chefs", "Dishes"],
  COLLECTIONS_TITLE: "Collection Types",
  COLLECTIONS_LENGTH: 3,
  HEADER_TITLE: "Content",
};

export const DASHBOARD = {
  EDIT_DIALOG: {
    TITLE: "Edit",
    CANCEL: "Cancel",
    SAVE: "Save",
  },
  DELETE_DIALOG: {
    TITLE: "Are you sure you want to delete?",
    BODY: "Once deleted, this action cannot be undone.",
    CANCEL: "Cancel",
    DELETE: "Delete",
  },
  HEADER: {
    BACK: "Back",
    ENTRIES: "entries was found",
    CREATE_BUTTON: " + Create new entry",
  },

  CREATE_DIALOG: {
    TITLE: "Create new",
    CANCEL: "Cancel",
    CREATE: "Create",
  },
};

export const COLLECTIONS_DATA = {
  RESTAURANTS: {
    columns: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "img",
        headerName: "Image",
        width: 130,
        renderCell: renderImgCell,
      },
      {
        field: "chef",
        headerName: "Chef",
        type: "list",
        options: await fetchChefs().then((chefs) =>
          chefs?.map((chef) => ({
            id: chef.id,
            name: chef.name,
          }))
        ),
        width: 130,
      },
      {
        field: "chef_name",
        headerName: "Chef",
        width: 130,
      },
      {
        field: "rate",
        headerName: "Rate",
        width: 130,
      },
      {
        field: "dishes",
        headerName: "Dishes",
        type: "list",
        options: await fetchDishes().then((dishes) =>
          dishes?.map((dish) => ({
            id: dish.id,
            name: dish.name,
          }))
        ),
        multiple: true,
        width: 130,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: renderActionsCell,
      },
    ],
  },
  CHEFS: {
    columns: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "img",
        headerName: "Image",
        width: 130,
        renderCell: renderImgCell,
      },
      {
        field: "description",
        headerName: "Description",
        width: 180,
      },
      {
        field: "restaurants",
        headerName: "Restaurants",
        type: "list",
        options: await fetchRestaurants().then((restaurants) =>
          restaurants?.map((restaurant) => ({
            id: restaurant.id,
            name: restaurant.name,
          }))
        ),
        multiple: true,
        width: 130,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: renderActionsCell,
      },
    ],
  },
  DISHES: {
    columns: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "img",
        headerName: "Image",
        width: 130,
        renderCell: renderImgCell,
      },
      {
        field: "price",
        headerName: "Price",
        width: 90,
      },
      {
        field: "ingredients",
        headerName: "Ingredients",
        width: 180,
      },
      {
        field: "restaurant",
        headerName: "Restaurant",
        type: "list",
        options: await fetchRestaurants().then((restaurants) =>
          restaurants?.map((restaurant) => ({
            id: restaurant.id,
            name: restaurant.name,
          }))
        ),
        width: 130,
      },
      {
        field: "tags",
        headerName: "Tags",
        type: "list",
        options: [
          {
            id: "vegan",
            name: "vegan",
          },
          {
            id: "vegetarian",
            name: "vegetarian",
          },
          {
            id: "spicy",
            name: "spicy",
          },
        ],
        multiple: true,
        width: 130,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: renderActionsCell,
      },
    ],
  },
};

export const COLLECTIONS = {
  restaurants: "restaurants",
  chefs: "chefs",
  dishes: "dishes",
  NOT_FOUND: "Collection not found.",
};
