import axios from "axios"
import { BASE_URL } from "../../app/constant"

export async function addToCart(items) {
  try {
    const response = await axios.post(`/api/cart/items`, items)
    const data = response.data
    return data
  } catch (error) {
    console.error("Error in add to cart Section", error)
  }
}

export async function fecthItemsByUserId() {
  try {
    const response = await axios.get(`/api/cart`)
    const data = response.data
    console.log(response.data)
    return data;
  } catch (error) {
    console.error("Error in fetchItem to cart Section", error)
  }
}

export async function updateCart(id) {

  try {
    const response = await axios.patch(`/api/cart/items/${id}`)
    console.log(response)
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error in update cart Section", error)
  }
}

export async function clearCartItem() {
  try {
    const response = await axios.delete(`/api/cart`)
    return response;
  } catch (error) {
    console.error("Error in Clearcart Section", error)
  }
}

export async function deleteCartItem(id) {
  console.log(id)
  try {
    const response = await axios.delete(`/api/cart/items/${id}`)
    console.log(response)
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error in update cart Section", error)
  }
}