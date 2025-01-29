import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { selectLoggedInUser } from "../components/auth/authSlice";
import ProfileImg from "../assets/login.jpg";
function MyProfile() {
  const user = useSelector(selectLoggedInUser);
  // console.log(user);
  return (
    <>
      {!user && <Navigate to={"/login"} />}

      <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-5 max-w-7xl mx-auto m-2">
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md ">
            <div className="flex flex-col items-center">
              <h2 className="mt-4 text-2xl font-semibold">
                {user?.userName || "Customer Name"}
              </h2>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium">About Me</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <p className="mt-2 text-gray-600">Email: {user?.email}</p>
              <p className="mt-2 text-gray-600">Phone: {user?.mobileNo}</p>
            </div>
          </div>
        </div>
        {/* Image Part */}
        <div className=" md:block hidden lg:col-span-2 p-2">
          <h2 className="text-center mt-3 text-xl font-semibold">
            Profile Image
          </h2>
          <img
            src={ProfileImg}
            alt="login-image"
            className=" border-4 border-white rounded-full my-10 border-spacing-2 p-1 md:block hidden shadow-lg"
          />
        </div>
      </div>
    </>
  );
}

export default MyProfile;
