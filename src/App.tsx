import { Dashboard } from "./components/Dashboard/Dashboard.tsx";
import SideBar from "./components/SideBar/SideBar.tsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  ChefColumns,
  RestaurantColumns,
  DishColumns,
} from "./components/Dashboard/columns";
import { AppContainer } from "./styles.ts";
import { SIDE_BAR, DishesData, RestaurantsData, ChefsData } from "./resources/content.ts";

function App() {
  const [activePage, setActivePage] = useState<string>("");
  return (
    <AppContainer>
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
              data={RestaurantsData}
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
              data={ChefsData}
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
              data={DishesData}
              columnData={DishColumns}
              setActivePage={setActivePage}
              pageName="dishes"
            />
          }
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
