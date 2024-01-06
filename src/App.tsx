import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./routes/Homepage/Homepage";
import NavbarFooterLayout from "./routes/NavbarFooterLayout/NavbarFooterLayout";
import ShopPage from "./routes/ShopPage/ShopPage";
import SignInPage from "./routes/SignInPage/SignInPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarFooterLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="sign-in" element={<SignInPage />} />
      </Route>
    </Routes>
  );
}

export default App;
