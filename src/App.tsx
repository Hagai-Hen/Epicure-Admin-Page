import { Dashboard } from "./components/Dashboard/Dashboard.tsx";
import SideBar from "./components/SideBar/SideBar.tsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import {
  ChefColumns,
  RestaurantColumns,
  DishColumns,
} from "./components/Dashboard/columns";
import { AppContainer } from "./styles.ts";
import { SIDE_BAR } from "./resources/content.ts";
import { PAGE_NAMES, ROUTES } from "./constants/routes.ts";

function App() {
  const [activePage, setActivePage] = useState<string>("");

  // Accessing state from Redux
  const chefs = useSelector((state: any) => state.chefs.chefs); // Fetch chefs from Redux store
  const restaurants = useSelector(
    (state: any) => state.restaurants.restaurants
  ); // Fetch restaurants
  const dishes = useSelector((state: any) => state.dishes.dishes); // Fetch dishes

  return (
    <AppContainer>
      <SideBar
        activePage={activePage}
        collections={SIDE_BAR.COLLECTIONS}
        setActivePage={setActivePage}
      />
      <Routes>
        <Route path={`${ROUTES.HOME_PAGE}`} element={<h1>Home Page</h1>} />
        <Route
          path={`${ROUTES.RESTAURANTS}`}
          element={
            <Dashboard
              data={restaurants} // Pass restaurants from Redux
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
              data={chefs} // Pass chefs from Redux
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
              data={dishes} // Pass dishes from Redux
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
