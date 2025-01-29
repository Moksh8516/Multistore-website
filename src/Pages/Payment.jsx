import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderAsync,
  selectCurrentOrder,
} from "../features/Order/orderSlice";
import { loadStripe } from "@stripe/stripe-js";
import { selectedCartItem } from "../components/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../app/constant";
function Payment() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);
  const currentOrder = useSelector(selectCurrentOrder);
  const items = useSelector(selectedCartItem);

  useEffect(() => {
    dispatch(fetchOrderAsync(currentOrder._id));
  }, [dispatch]);

  const handlePayment = async () => {
    const currentOrder = {
      orderItems: items,
    };
    const stripe = await loadStripe(import.meta.evn.VITE_PUBLISHABLE_KEY);
    const response = await fetch(
      `${BASE_URL}/api/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentOrder }),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-lg lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-5 mt-6">
          <div className="lg:col-span-3">
            <h2 className=" font-bold tracking-light text-gray-900 text-lg sm:text-xl lg:text-2xl xl:text-3xl px-2">
              Shipping Address
            </h2>
            <h2 className="mt-4 font-bold tracking-light text-gray-900 text-base sm:text-lg lg:text-xl xl:text-2xl">
              Order Number#{currentOrder && currentOrder._id}
            </h2>
            <form className="mt-5">
              <div className="text-gray-900 border-gray-400 m-2 p-4 space-y-2 w-full hover:border-sky-400 rounded-lg border-spacing-1 border-2 hover:bg-gray-50 max-w-md">
                <p className="font-semibold text-base">
                  Name: {address.address.userName}
                </p>
                <p className="font-semibold text-base">
                  Building No: {address.address.building_no}
                </p>
                <p className="font-medium text-base">
                  Street: {address.address.street}
                </p>
                <p className="font-medium text-base">
                  City: {address.address.city}
                </p>
                <p className="font-medium text-base">
                  PinCode: {address.address.pincode}
                </p>
                <div className=" flex gap-2 items-center">
                  <p className=" font-medium text-base">Phone Number : </p>
                  <p className="text-base">{address.address.mobile_no}</p>
                </div>
                <div className=" flex gap-2 items-center">
                  <p className=" font-medium text-base">
                    State: {address.address.state}
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className="col-span-2">
            <h2 className=" font-bold tracking-light text-gray-900 text-lg sm:text-xl lg:text-2xl xl:text-3xl px-2 text-center">
              Payment
            </h2>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {currentOrder &&
                    currentOrder.orderItems.map((product) => (
                      <li key={product._id} className="flex py-6">
                        <div className="max-h-24 max-w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.thumbnail}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-1 md:ml-4 flex flex-1 flex-col gap-1">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-1 md:ml-4">{product.price}</p>
                            </div>
                            <p className="text-gray-600 mt-1 text-base">
                              {product.brand}
                            </p>
                            <div className=" flex space-x-5 items-center text-gray-900 mt-4">
                              <p className=" font-semibold sm:text-sm line-through text-gray-600">
                                {Math.round(
                                  product.price * (1 + product.discount / 100)
                                )}
                              </p>
                              <p className="opacity-60 line-through sm:text-sm">
                                {product.amount}
                              </p>
                              <p className="text-green-600 font-semibold sm:text-sm">
                                -{product.discount}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 py-1">
                    <p>Total Items</p>
                    <p>{currentOrder && currentOrder.totalItem}</p>
                  </div>
                  <hr className="bg-gray-800" />
                  <div className="flex justify-between text-base font-medium text-gray-900 py-2">
                    <p>Total Price</p>
                    <p>{currentOrder && currentOrder.totalAmount}</p>
                  </div>
                  <hr className="bg-gray-800" />
                </div>
                <div className="flex align-middle justify-center">
                  <button
                    onClick={handlePayment}
                    className="bg-yellow-500 text-gray-800 p-3 rounded-full shadow-md border-none text-center text-lg font-semibold hover:bg-yellow-400 mt-2"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
