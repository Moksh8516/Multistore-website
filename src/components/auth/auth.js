import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../app/constant";
// function extractErrorMessageFromHtml(html) {
//   const preTagRegex = /<pre>(.*?)<\/pre>/;
//   const match = html.match(preTagRegex);
//   if (match) {
//     const errorMessage = match[1].trim();
//     return errorMessage;
//   } else {
//     return 'Unknown error';
//   }
// }

export async function createUser(userData) {
  try {
    const response = await axios.post(`/api/v1/user/register`, userData)
    const data = response.data
    return data
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in register:", error);
    throw error;
  }
}

export async function checkUser(userData) {
  try {
    const response = await axios.post(`/api/v1/user/login`, userData)
    const data = response.data
    return data
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in login:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await axios.post(`/api/v1/user/logout`)
    const data = response.data;
    return { data }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in logout:", error);
    throw error; // This will reject the promise with the error
  }
}

export async function forgetPassword(email) {
  try {
    const response = await axios.post(`/api/v1/user/forgot-password`, email)
    const data = response.data;
    return (data)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in forgot Password:", error);
    throw error; // This will reject the promise with the error
  }
}

export async function ResetPassword(newPassword) {
  try {
    const response = await axios.patch(`/api/v1/user/reset-Password/${newPassword.token}`, newPassword.data)
    const data = response.data
    return (data)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in resetPassword:", error);
    throw error; // This will reject the promise with the error
  }

}

export async function updateProfile(data) {
  try {
    const response = await axios.patch(`/api/v1/user/update-profile`, data)
    const data = response.data
    return (data)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in updateProfile:", error);
    throw error; // This will reject the promise with the error
  }
}

export async function updatePassword(data) {
  try {
    const response = await axios.patch(`/api/v1/user/update-password`, data)
    return (response)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in update Password:", error);
    throw error; // This will reject the promise with the error
  }
}

export async function updateProfileImage(data) {
  try {
    const response = await axios.patch(`/api/v1/user/update-profile-image`, data)
    const data = response.data
    return (data)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in update Profile Image:", error);
    throw error; // This will reject the promise with the error
  }
}

export async function getProfile() {
  try {
    const response = await axios.get(`/api/v1/user/profile`)
    return (response.data)
  } catch (error) {
    console.error(error)
  }
}

export async function reLoginUser() {
  try {
    const response = await axios.post(`/api/v1/user/refresh-token`)
    return (response.data)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data?.message)
    }
    console.error("Error in reLogin:", error);
    throw error; // This will reject the promise with the error
  }
}