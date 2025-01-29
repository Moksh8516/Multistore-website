import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AddressMessage,
  createAddressAsync,
  selectedAddress,
} from "../../features/Address/addressSlice";

function AddressPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createAddressAsync(data));
    reset();
  };

  const msg = useSelector(AddressMessage);
  const address = useSelector(selectedAddress);
  // console.log(address);
  const notify = () => {
    if (!msg) {
      toast.error("Please fill all the fields");
    }
    msg && toast.success(msg) && navigate("/checkout-form");
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form
            autocomplete="off"
            noValidate
            className="bg-gray-100 px-4 py-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Delivery Address
                </h2>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900 mt-3"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      autocomplete="off"
                      {...register("country")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset hover:bg-sky-50 bg-gray-100 ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={"India"}>India</option>
                      <option value={"united States"}>United States</option>
                      <option value={"Canada"}>Canada</option>
                      <option value={"Mexico"}>Mexico</option>
                    </select>
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="userName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name (First and Last name)
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-400 sm:max-w-md">
                        <input
                          type="text"
                          autocomplete="off"
                          {...register("userName", {
                            required: "UserName is Required",
                          })}
                          id="userName"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Full Name"
                        />
                      </div>
                      {errors.userName && (
                        <span className="text-red-500 text-center text-sm">
                          {errors.userName.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="mobile_no"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mobile number
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-400 sm:max-w-md">
                        <input
                          type="number"
                          autocomplete="off"
                          {...register("mobile_no", {
                            required: "Mobile Number is Required",
                          })}
                          id="mobile_no"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="10-digit mobile number without prefixes"
                        />
                      </div>
                    </div>
                    {errors.mobile_no && (
                      <span className="text-red-500 text-center text-sm">
                        {errors.mobile_no.message}
                      </span>
                    )}
                    <p className="mt-1 text-xs leading-6 text-gray-800">
                      May be used to assist delivery
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-800">
                  Use a permanent address where you can receive Parcel.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        autocomplete="off"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  bg-gray-100  hover:bg-sky-50 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-center text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="building_no"
                      className="block text-base font-medium leading-6 text-gray-900"
                    >
                      Flat, House no, Building, Company, Apartment
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        autocomplete="off"
                        {...register("building_no", {
                          required: "House No is Required",
                        })}
                        id="building_no"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  bg-gray-100  hover:bg-sky-50 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.building_no && (
                      <span className="text-red-500 text-center text-sm">
                        {errors.building_no.message}
                      </span>
                    )}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-base font-medium leading-6 text-gray-900"
                    >
                      Area, Street, Sector, Village
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        autocomplete="off"
                        {...register("street", {
                          required: "Street is Required",
                        })}
                        id="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  bg-gray-100 hover:bg-sky-50 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.street && (
                      <span className="text-red-500 text-center text-sm">
                        {errors.street.message}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="landMark"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Landmark
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("landMark")}
                        id="landMark"
                        placeholder="E.g. near Park hospital"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  bg-gray-100 hover:bg-sky-50 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      PinCode
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        autocomplete="off"
                        {...register("pincode", {
                          required: "PinCode is Required",
                        })}
                        id="pincode"
                        placeholder="6-digit Pincode"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  bg-gray-100 hover:bg-sky-50 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.pincode && (
                      <span className="text-red-500 text-center text-sm">
                        {errors.pincode.message}
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Town/City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        autocomplete="off"
                        {...register("city", {
                          required: "City Name is Required",
                        })}
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  bg-gray-100 hover:bg-sky-50 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.city && (
                      <span className="text-red-500 text-center text-sm">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State
                    </label>
                    <div className="mt-2">
                      <select
                        id="state"
                        name="state"
                        autocomplete="off"
                        {...register("state", {
                          required: "State field is Required",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900  bg-gray-100 hover:bg-sky-50 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Select</option>
                        <option value={"Punjab"}>Punjab</option>
                        <option value={"Haryana"}>Haryana</option>
                        <option value={"Jammu Kashmir"}>Jammu Kashmir</option>
                        <option value={"Rajasthan"}>Rajasthan</option>
                        <option value={"Himachal Pradesh"}>
                          Himachal Pradesh
                        </option>
                      </select>
                    </div>
                    {errors.state && (
                      <span className="text-red-500 text-sm text-center">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={() => {
                  reset();
                }}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={notify}
                className="rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                Add Address
              </button>
            </div>
          </form>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}

export default AddressPage;
