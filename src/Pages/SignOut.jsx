import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectLoggedInUser,
  signoutUserAsync,
} from "../components/auth/authSlice";

function SignOut() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signoutUserAsync());
  });
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default SignOut;
