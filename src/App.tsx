import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./routes/Homepage/Homepage";
import NavbarFooterLayout from "./routes/NavbarFooterLayout/NavbarFooterLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarFooterLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
