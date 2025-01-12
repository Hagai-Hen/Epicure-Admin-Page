import {
  renderImgCell,
  renderActionsCell,
  dishesRenderCell,
  restaurantsRenderCell,
  restaurantRenderCell,
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
    CHOOSE: "Choose Image",
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

export const LOGIN_PAGE = {
  WELCOME: "Welcome!",
  SIGN_IN: "Sign in to continue.",
  EMAIL: "Email",
  EMAIL_PLACEHOLDER: "example@moveo.co.il",
  PASSWORD: "Password",
  PASSWORD_PLACEHOLDER: "password",
  LOGIN_BUTTON: "Log in",
};

export const HOME_PAGE = {
  WELCOME: "Welcome,",
};

export const COLLECTIONS_DATA = {
  RESTAURANTS: {
    columns: [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        sortable: false,
        disableColumnMenu: true,
      },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "img",
        headerName: "Image",
        width: 130,
        renderCell: renderImgCell,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "chef",
        headerName: "Chef",
        type: "list",
        options: [],
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
        options: [],
        renderCell: dishesRenderCell,
        multiple: true,
        width: 130,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: renderActionsCell,
        sortable: false,
        disableColumnMenu: true,
      },
    ],
  },
  CHEFS: {
    columns: [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        sortable: false,
        disableColumnMenu: true,
      },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "img",
        headerName: "Image",
        width: 130,
        renderCell: renderImgCell,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 180,
        sortable: false,
      },
      {
        field: "restaurants",
        headerName: "Restaurants",
        type: "list",
        options: [],
        renderCell: restaurantsRenderCell,
        multiple: true,
        width: 130,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: renderActionsCell,
        sortable: false,
        disableColumnMenu: true,
      },
    ],
  },
  DISHES: {
    columns: [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        sortable: false,
        disableColumnMenu: true,
      },
      { field: "name", headerName: "Name", width: 130 },
      {
        field: "img",
        headerName: "Image",
        width: 130,
        renderCell: renderImgCell,
        sortable: false,
        disableColumnMenu: true,
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
        sortable: false,
      },
      {
        field: "restaurant",
        headerName: "Restaurant",
        type: "list",
        options: [],
        renderCell: restaurantRenderCell,
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
        sortable: false,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: renderActionsCell,
        sortable: false,
        disableColumnMenu: true,
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
