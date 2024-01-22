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
import AdminPage from "./routes/AdminPage/AdminPage";
import ProtectedRoute from "./routes/Auth/ProtectedRoute/ProtectedRoute";
import ProductManagementPage from "./routes/ProductManagementPage/ProductManagementPage";

import { APP_ROLES } from "./types/appRoles";

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
        {/* public routes */}
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route
          element={
            <ViewportHeightLayout className="flex justify-center items-center" />
          }
        >
          <Route path="product/:id" element={<ProductPage />} />
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
          element={
            <ViewportHeightLayout className="flex justify-center items-center bg-blob-scatter bg-cover" />
          }
        >
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        {/* private routes */}
        <Route element={<ProtectedRoute allowedRoles={[APP_ROLES.ADMIN]} />}>
          <Route
            element={
              <ViewportHeightLayout className="flex justify-center items-center" />
            }
          >
            <Route path="admin" element={<AdminPage />} />
            <Route
              path="admin/productManagement/:id"
              element={<ProductManagementPage />}
            />
          </Route>
        </Route>
      </Route>

      {/* catch all / 404 route */}
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center">
            {/* This is just temporary */}
            <h1>404</h1>
            <p>Page not found</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
