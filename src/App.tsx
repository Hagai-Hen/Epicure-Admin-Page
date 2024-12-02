import { Dashboard } from "./components/Dashboard/Dashboard";
import SideBar from "./components/SideBar/SideBar";
import { SIDE_BAR } from "./resources/content";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  ChefColumns,
  RestaurantColumns,
  DishColumns,
} from "./components/Dashboard/columns";

const RestaurantRows = [
  {
    id: "6745f3ea965ba597781b838d",
    name: "Claro",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806809/ozrifpwjv1qql8suzuty.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: ["6746c7d8ea269913f38a9aac"],
    __v: 0,
    chef_name: "Ran Shmueli",
    rate: 4,
  },
  {
    id: "67471dcb730338f3d28a6bbb",
    name: "Lumina",
    chef: "6746c81fea269913f38a9ab0",
    dishes: ["6746c81fea269913f38a9ab0"],
    __v: 0,
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806817/zhwocebfu3sleg1viowa.svg",
    chef_name: "Meir Adoni",
    rate: 3,
  },
  {
    id: "67472669a6d48ec9ef1754ee",
    name: "Tiger Lilly",
    chef: "6745f3ea965ba597781b838d",
    dishes: [],
    __v: 0,
    rate: 4,
    chef_name: "Yanir Green",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806902/zbfkbdl5t41i5h7lemwg.svg",
  },
  {
    id: "674c44718aaa293d8dc18049",
    name: "Onza",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806823/wg4yuwnvxls8ty1rj6ws.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: [],
    rate: 4,
    chef_name: "Yossi Shitrit",
    __v: 0,
  },
  {
    id: "674c4e53f800f3710349790d",
    name: "Mashya",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806820/fenogs9g8vncxrx0ijvq.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: [],
    rate: 4,
    chef_name: "Yossi Shitrit",
    __v: 0,
  },
  {
    id: "674c4e9bf800f37103497922",
    name: "Kitchen Market",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806815/qshyv9wopgjqhrersze3.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: [],
    rate: 4,
    chef_name: "Yossi Shitrit",
    __v: 0,
  },
  {
    id: "674c539cf800f371034979f2",
    name: "Kitchen Market",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806815/qshyv9wopgjqhrersze3.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: [],
    rate: 4,
    chef_name: "Yossi Shitrit",
    __v: 0,
  },
  {
    id: "674c53d4f800f37103497a05",
    name: "Kitchen Market",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806815/qshyv9wopgjqhrersze3.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: [],
    rate: 4,
    chef_name: "Yossi Shitrit",
    __v: 0,
  },
  {
    id: "674c53d5f800f37103497a0a",
    name: "Kitchen Market",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806815/qshyv9wopgjqhrersze3.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: [],
    rate: 4,
    chef_name: "Yossi Shitrit",
    __v: 0,
  },
  {
    id: "674c53dbf800f37103497a21",
    name: "Kitchen Market",
    img: "https://res.cloudinary.com/dl0qa9k1r/image/upload/v1732806815/qshyv9wopgjqhrersze3.svg",
    chef: "6746c81fea269913f38a9ab0",
    dishes: [],
    rate: 4,
    chef_name: "Yossi Shitrit",
    __v: 0,
  },
];

const ChefRows = [
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
];

const dishRows = [
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
];

function App() {
  const [activePage, setActivePage] = useState<string>("");
  return (
    <div style={{ display: "flex" }}>
      <SideBar
        activePage={activePage}
        collections={SIDE_BAR.COLLECTIONS}
        setActivePage={setActivePage}
      />
      <Routes>
        <Route path="/" element={<h1>home page</h1>} />
        <Route
          path="/restaurants"
          element={
            <Dashboard
              data={RestaurantRows}
              columnData={RestaurantColumns}
              setActivePage={setActivePage}
              pageName="restaurants"
            />
          }
        />
        <Route
          path="/chefs"
          element={
            <Dashboard
              data={ChefRows}
              columnData={ChefColumns}
              setActivePage={setActivePage}
              pageName="chefs"
            />
          }
        />
        <Route
          path="/dishes"
          element={
            <Dashboard
              data={dishRows}
              columnData={DishColumns}
              setActivePage={setActivePage}
              pageName="dishes"
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
