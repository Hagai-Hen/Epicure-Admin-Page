import { Dashboard } from "./components/Dashboard/Dashboard";
import SideBar from "./components/SideBar/SideBar";
import { SIDE_BAR } from "./resources/content";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {
  const [activePage, setActivePage] = useState<string>('');
  return (
    <div style={{ display: "flex" }}>
      <SideBar activePage={activePage} collections={SIDE_BAR.COLLECTIONS} />
      <Routes>
        <Route
          path='/'
          element={ <h1>home page</h1>}
        />
        <Route
          path='/restaurants'
          element={<Dashboard data={["restaurants"]} setActivePage={setActivePage} />}
        />
        <Route
          path='/chefs'
          element={<Dashboard data={["chefs"]} setActivePage={setActivePage} />}
        />
        <Route
          path='/dishes'
          element={<Dashboard data={["dishes"]} setActivePage={setActivePage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
