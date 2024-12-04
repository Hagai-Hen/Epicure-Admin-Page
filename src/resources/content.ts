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
    data: [
      {
        id: "6746c81fea269913f38a9ab0",
        name: "Yossi Shitrit",
        img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806830/kuqt4pt1edwcrmztxqbv.svg",
        description:
          "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shitrit's creativity and culinary acumen born of long experience are expressed in the every detail of each and every dish.",
        restaurants: [
          "674c44718aaa293d8dc18049",
          "674c4e53f800f3710349790d",
          "674c4e9bf800f37103497922",
          "674c539cf800f371034979f2",
          "674c53d4f800f37103497a05",
          "674c53d5f800f37103497a0a",
          "674c53dbf800f37103497a21",
        ],
        __v: 0,
      },
      {
        id: "6747021f8812bb45c3705863",
        name: "fdfds",
        img: "fsss",
        description: "ffds",
        restaurants: [
          "6745f3ea965ba597781b838d",
          "6745f3ea965ba597781b838d",
          "67486a814a307de1bbde84c6",
          "674880844a307de1bbde87c5",
          "674880884a307de1bbde87ca",
          "6748809d4a307de1bbde87ce",
        ],
        __v: 0,
      },
    ],
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
    data: [
      {
        id: "6746c7d8ea269913f38a9aac",
        name: "Pad Ki Mao",
        price: 88,
        ingredients:
          "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
        tags: ["spicy"],
        restaurant: "6745f3ea965ba597781b838d",
        __v: 0,
        img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732807837/oq2r4o1as0yuibj9ruvm.svg",
      },
      {
        id: "6746dfc45c80d9640425ffe1",
        name: "Garbanzo Frito",
        price: 98,
        ingredients:
          "Polenta fingers, veal cheek, magic chili cured lemon cream, yellow laksa",
        tags: ["spicy", "vegetarian"],
        restaurant: "6745f3ea965ba597781b838d",
        __v: 0,
        img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806811/hkhxxsblav7xsspm9yx3.svg",
      },
      {
        id: "6746e4b3116f3d56b820fe57",
        name: "Smoked Pizza",
        price: 65,
        ingredients: "Basil dough, cashew butter, demi-glace, bison & radish",
        tags: ["spicy"],
        restaurant: "6745f3ea965ba597781b838d",
        __v: 0,
        img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806825/bi19w52xuvw4qwncrocu.svg",
      },
      {
        id: "674832a623bf566343cad0dc",
        name: "Spaghetti Carbonara",
        price: 100,
        ingredients: "A classic Italian pasta dish.",
        tags: ["spicy", "vegan"],
        restaurant: "67472c8ab5f3bae62426d4cb",
        __v: 0,
      },
    ],
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
        width: 130,
      },
      {
        field: "tags",
        headerName: "Tags",
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
