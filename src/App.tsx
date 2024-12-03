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
import {
  SIDE_BAR,
  DishesData,
  RestaurantsData,
  ChefsData,
} from "./resources/content.ts";
import { PAGE_NAMES, ROUTES } from "./constants/routes.ts";

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
        <Route path={`${ROUTES.HOME_PAGE}`} element={<h1>home page</h1>} />
        <Route
          path={`${ROUTES.RESTAURANTS}`}
          element={
            <Dashboard
              data={RestaurantsData}
              columnData={RestaurantColumns}
              setActivePage={setActivePage}
              pageName={`${PAGE_NAMES.RESTAURANTS}`}
            />
          }
        />
        <Route
          path={`${ROUTES.CHEFS}`}
          element={
            <Dashboard
              data={ChefsData}
              columnData={ChefColumns}
              setActivePage={setActivePage}
              pageName={`${PAGE_NAMES.CHEFS}`}
            />
          }
        />
        <Route
          path={`${ROUTES.DISHES}`}
          element={
            <Dashboard
              data={DishesData}
              columnData={DishColumns}
              setActivePage={setActivePage}
              pageName={`${PAGE_NAMES.DISHES}`}
            />
          }
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
