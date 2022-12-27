import { registerType } from "@/types/auth_types";
import { errorToast, successToast } from "../utils/alerts";
import axios from "axios";

//@ts-ignore
export const server_url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const registerUser = async (credentials: registerType) => {
  try {
    const response = await axios.post(
      `${server_url}/api/auth/signup`,
      credentials
    );
    if (response?.data.status === "success") {
      successToast(response?.data.message, "rsuccess");
    }
    return response.data;
  } catch (error: any) {
    errorToast(error.response.data.message, "rerror");
  }
};

export const verifyEmail = async (code: string, userID: string | undefined) => {
  try {
    const response = await axios.post(
      `${server_url}/api/auth/verify-email/${userID}`,
      { code }
    );
    if (response?.data.status === "success") {
      successToast(response?.data.message, "vsuccess");
    }
    return response.data;
  } catch (error: any) {
    errorToast(error.response.data.message, "veerror");
  }
};

export const sendVerificationCode = async (email: string) => {
  try {
    const response = await axios.post(
      `${server_url}/api/auth/send-verification-code`,
      { email }
    );
    if (response?.data.status === "success") {
      successToast(response?.data.message, "svsuccess");
    }
    return response.data;
  } catch (error: any) {
    errorToast(error.response.data.message, "sverror");
  }
};
