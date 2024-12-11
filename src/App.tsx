import SideBar from "./components/SideBar/SideBar.tsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AppContainer } from "./styles.ts";
import { SIDE_BAR } from "./resources/content.ts";
import { ROUTES } from "./constants/routes.ts";
import CollectionPage from "./pages/collection/Collection.tsx";
import LoginPage from "./pages/login/Login.tsx";

function App() {
  const [activePage, setActivePage] = useState<string>("");
  const location = useLocation(); // Use location to check the current route

  // Determine if the current route is the login route
  const isLoginPage = location.pathname === ROUTES.LOGIN;

  return (
    <AppContainer>
      {!isLoginPage && <SideBar
        activePage={activePage}
        collections={SIDE_BAR.COLLECTIONS}
        setActivePage={setActivePage}
      />}
      <Routes>
        <Route path={`${ROUTES.HOME_PAGE}`} element={<div/>} />
        <Route path={`${ROUTES.LOGIN}`} element={<LoginPage/>} />
        <Route
          path={`${ROUTES.COLLECTIONS}${ROUTES.COLLECTION}`}
          element={<CollectionPage setActivePage={setActivePage} />}
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
