import axios from "axios"
import { BASE_URL } from "../../app/constant"

export async function addToCart(items) {
  try {
    const response = await axios.post(`${BASE_URL}/api/cart/items`, items, {
      withCredentials: true
    })
    const data = response.data
    return data
  } catch (error) {
    console.error("Error in add to cart Section", error)
  }
}

export async function fecthItemsByUserId() {
  try {
    const response = await axios.get(`${BASE_URL}/api/cart`, {
      withCredentials: true
    })
    const data = response.data
    // console.log(response.data)
    return data;
  } catch (error) {
    console.error("Error in fetchItem to cart Section", error)
  }
}

export async function updateCart(id) {

  try {
    const response = await axios.patch(`${BASE_URL}/api/cart/items/${id}`, {
      withCredentials: true
    })
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error in update cart Section", error)
  }
}

export async function clearCartItem() {
  try {
    const response = await axios.delete(`${BASE_URL}/api/cart`, {
      withCredentials: true
    })
    return response;
  } catch (error) {
    console.error("Error in Clearcart Section", error)
  }
}

export async function deleteCartItem(id) {
  console.log(id)
  try {
    const response = await axios.delete(`${BASE_URL}/api/cart/items/${id}`, {
      withCredentials: true
    })
    // console.log(response)
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error in update cart Section", error)
  }
}