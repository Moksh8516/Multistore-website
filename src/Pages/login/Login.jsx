import React, { useState } from "react";
import login_img from "../../assets/login.jpg";
import google_img from "../../assets/google.png";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  checkUserAsync,
  reLoginUserAsync,
  selectLoggedInUser,
  selectUserMessage,
} from "../../components/auth/authSlice";
function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  // console.log(user);
  const userMsg = useSelector(selectUserMessage);
  const reqtoken = (user) => {
    if (!user.refreshToken) {
      <Navigate to={"/signup"} replace={true}></Navigate>;
    }
    dispatch(reLoginUserAsync());
  };

  return (
    <>
      {user && <Navigate to={"/"} replace={true}></Navigate>}
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 ">
          {/* text Part  */}
          <div className="md:w-1/2 px-16">
            <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-[#6366f1] ">
              Login
            </h2>
            <p className="text-sm mt-4 xl:text-base 2xl:text-lg ">
              If you already a member, easily Log in
            </p>
            <form
              className="flex flex-col"
              action="#"
              method="POST"
              onSubmit={handleSubmit(
                (data) => (dispatch(checkUserAsync(data)), console.log(data))
              )}
            >
              <input
                type="text"
                placeholder="Email/Mobile Number"
                className="p-2 rounded-xl l-2 mt-8 border"
                {...register("email", {
                  required: "Email/Mobile Number is required",
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500 p-1">
                  {errors.email?.message}
                </span>
              )}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 rounded-xl l-2 mt-8 w-full "
                  {...register("password", {
                    required: "Password field is required",
                  })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500 p-1">
                    {errors.password?.message}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-600  right-2 absolute align-middle top-1/2 translate-y-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                {/* {errorMsg && (
                  <span className="text-red-500 text-sm">{errorMsg}</span>
                )} */}
              </div>
              <button className="mt-5 font-bold text-base xl:text-xl bg-[#6366f1] text-white p-2 rounded-full hover:scale-105 duration-200">
                Log in
              </button>
            </form>

            <div className="grid grid-cols-3 mt-10 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center">OR</p>
              <hr className="border-gray-400 " />
            </div>
            <button
              className="bg-white border py-2 w-full rounded-xl text-sm xl:text-base  2xl:text-xl mt-5 relative flex justify-center items-center hover:scale-105 duration-200"
              onClick={reqtoken}
            >
              <img
                src={google_img}
                alt="google-icon"
                className="absloute w-5 mx-3 "
              />
              Login with Google
            </button>
            <p className="mt-5 text-xs border-b text-[#6366f1] py-4 font-italic">
              <Link to={"/forget-Password"}>Forget Your Password?</Link>
            </p>
            <div className="text-xs mt-3 flex justify-between items-center">
              <p>If you don't have an account..</p>
              <button className="bg-white border-b border-gray-500 rounded-xl hover:scale-105 duration-200 p-2">
                <Link to="/signup">Register</Link>
              </button>
            </div>
          </div>
          {/* Image Part */}
          <div className=" md:block hidden w-1/2">
            <img
              src={login_img}
              alt="login-image"
              className="rounded-2xl h-full md:block hidden "
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
