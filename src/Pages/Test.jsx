import React from "react";
import axios from "axios";

async function data() {
  const response = await axios.get(
    "https://multistore-ecommerce-app.vercel.app/api/product"
  );
  console.log(response);
}
data();

function Test() {
  return <div>test</div>;
}

export default Test;
