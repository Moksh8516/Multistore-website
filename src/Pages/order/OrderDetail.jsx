import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../features/Order/orderSlice";

function OrderDetail() {
  const currentorder = useSelector(selectOrder);
  // console.log(currentorder);
  return (
    <div className="p-4 shadow-lg border-2 rounded-lg hover:shadow-2xl  mt-2">
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "space-between",
          border: "2px-solid-gray",
          margin: "10px",
        }}
      >
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/y/r/m/xxs-sada-plain-kurta-ksh-trendz-original-imag4baggdt7txju-bb.jpeg?q=70"
              alt=""
              className="max-h-28 max-w-28 p-4 object-fill"
            />
            <div className="m-3 space-y-2">
              <p>men slim Mid Shirt</p>
              <p className="text-sm opacity-50 font-semibold">Shirt</p>
              <p className="text-sm opacity-50 font-semibold">Color</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p className="mt-4">1099</p>
        </Grid>

        <Grid item xs={4}>
          <p className="mt-4">
            <span>Delivered On March</span>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderDetail;
