import axios from "axios"
import { BASE_URL } from "../../app/constant"
export async function createAddress(addressData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/address`, addressData, {
      withCredentials: true,
    })
    const data = response.data
    return (data)
  } catch (error) {
    console.error("Error in Create Address Section", error)
  }
}

export async function getAddress() {
  try {
    const response = await axios.get(`${BASE_URL}/api/address`, {
      withCredentials: true,
    })
    const data = response.data
    return (data)
  } catch (error) {
    console.error("Error in Get Address Section", error)
  }

}

export async function updateAddress(addressData) {
  try {
    const response = await axios.patch(`${BASE_URL}/api/address/${addressData._id}`, addressData, {
      withCredentials: true,
    })
    // console.log(response)
    const data = response.data
    return data
  } catch (error) {
    console.error("Error in Update Address Section", error)
  }
}

export async function removeAddress(addressId) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/address/${addressId}`, {
      withCredentials: true,
    })
    const data = response.data
    return (data)
  } catch (error) {
    console.error("Error in Delete Address Section", error)
  }
}

