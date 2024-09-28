import axios from "axios"
import { BASE_URL } from "../../app/constant"
export async function createAddress(addressData) {
  try {
    const response = await axios.post(`/api/address`, addressData)
    const data = response.data
    return (data)
  } catch (error) {
    console.error("Error in Create Address Section", error)
  }
}

export async function getAddress() {
  try {
    const response = await axios.get(`/api/address`)
    const data = response.data
    return (data)
  } catch (error) {
    console.error("Error in Get Address Section", error)
  }

}

export async function updateAddress(addressData) {
  try {
    const response = await axios.patch(`/api/address/${addressData._id}`, addressData)
    console.log(response)
    const data = response.data
    return data
  } catch (error) {
    console.error("Error in Update Address Section", error)
  }
}

export async function removeAddress(addressId) {
  try {
    const response = await axios.delete(`/api/address/${addressId}`)
    const data = response.data
    return (data)
  } catch (error) {
    console.error("Error in Delete Address Section", error)
  }
}

