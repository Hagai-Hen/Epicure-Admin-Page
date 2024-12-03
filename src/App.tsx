import SideBar from "./components/SideBar/SideBar.tsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ChefColumns,
  RestaurantColumns,
  DishColumns,
} from "./components/Dashboard/columns";
import { AppContainer } from "./styles.ts";
import { SIDE_BAR } from "./resources/content.ts";
import { PAGE_NAMES, ROUTES } from "./constants/routes.ts";
import CollectionPage from "./pages/collection/Collection.tsx";


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
        <Route path={`${ROUTES.HOME_PAGE}`} element={<h1>Home Page</h1>} />
        <Route
          path={`${ROUTES.COLLECTIONS}${ROUTES.COLLECTION}`}
          element={<CollectionPage setActivePage={setActivePage} />}
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
