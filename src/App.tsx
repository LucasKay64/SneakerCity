import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch } from "./hooks/reduxHooks";
import { verifyTokenAndFetchUserAsync } from "./store/userSlice/userSlice";

import HomePage from "./routes/Homepage/Homepage";
import NavbarFooterLayout from "./routes/NavbarFooterLayout/NavbarFooterLayout";
import ShopPage from "./routes/ShopPage/ShopPage";
import SignInPage from "./routes/Auth/SignInPage/SignInPage";
import SignUpPage from "./routes/Auth/SignUpPage/SignUpPage";
import ViewportHeightLayout from "./routes/Auth/AuthLayout/ViewportHeightLayout";
import ProductPage from "./routes/ProductPage/ProductPage";
import CheckoutPage from "./routes/CheckoutPage/CheckoutPage";

import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(verifyTokenAndFetchUserAsync(token));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<NavbarFooterLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route
          path="product"
          element={
            <ViewportHeightLayout className="flex justify-center items-center" />
          }
        >
          <Route index element={<Navigate to="/shop" replace />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route
          path="auth"
          element={
            <ViewportHeightLayout className="flex justify-center items-center bg-blob-scatter bg-cover" />
          }
        >
          <Route index element={<Navigate to="sign-in" replace />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route
          path="checkout"
          element={
            <ViewportHeightLayout className="flex justify-center items-center bg-blob-scatter bg-cover" />
          }
        >
          <Route index element={<CheckoutPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
