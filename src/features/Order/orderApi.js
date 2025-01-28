import axios from "axios";
import { BASE_URL } from "../../app/constant"

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/order`, order)
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrder = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/order/getorder`, id)
    // console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
  }
}