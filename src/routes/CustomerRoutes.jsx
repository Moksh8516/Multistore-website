import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  Login,
  ProductList,
  Signup,
  // Cart,
  Checkoutform,
  ProductOverview,
  OrderStatus,
} from "../components/index";

import {
  Errorpage,
  Profile,
  Setting,
  ForgetPassword,
  Signout,
  ResetPassword,
  Payment,
  UpdatePaasword,
  CartPage,
} from "../Pages/page";

import AddressPage from "../Pages/addressSection/AddressPage";
import OrderSucess from "../Pages/order/OrderSucess";
import Cancel from "../Pages/Cancel";
import Protected from "../components/auth/Protected";
import MyProfile from "../Pages/MyProfile";

function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/product" element={<ProductList />} />
      <Route path="/product/:productId" element={<ProductOverview />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/MyProfile" element={<MyProfile />} />
      <Route path="/update-password" element={<UpdatePaasword />} />

      <Route
        path="/address"
        element={
          <Protected>
            <AddressPage />
          </Protected>
        }
      />

      <Route
        path="/Payment"
        element={
          <Protected>
            <Payment />
          </Protected>
        }
      />

      <Route
        path="/checkout-form"
        element={
          <Protected>
            <Checkoutform />
          </Protected>
        }
      />

      <Route
        path="/order"
        element={
          <Protected>
            <OrderStatus />
          </Protected>
        }
      />

      <Route
        path="/Setting"
        element={
          <Protected>
            <Setting />
          </Protected>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Signout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-Password" element={<ForgetPassword />} />
      <Route path="/reset-Password/:token" element={<ResetPassword />} />
      <Route path="/orderSuccess" element={<OrderSucess />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
}

export default CustomerRoutes;
