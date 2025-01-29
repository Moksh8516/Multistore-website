import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder, selectOrder } from "../../features/Order/orderSlice";
import { clearCartItemAsync } from "../../components/cart/cartSlice";
function OrderSucess() {
  const dispatch = useDispatch();
  const CurrentOrder = useSelector(selectOrder);
  // console.log(CurrentOrder);
  useEffect(() => {
    dispatch(clearCartItemAsync());
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      {/* {!params.id &&  <Navigate to='/' replace={true}></Navigate>} */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-sky-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{CurrentOrder && CurrentOrder._id}
          </h1>

          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-sky-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSucess;
