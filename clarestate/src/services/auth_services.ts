import { registerType } from "@/types/auth_types";
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
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const verifyEmail = async (code: string, userID: string | undefined) => {
  try {
    const response = await axios.post(
      `${server_url}/api/auth/verify-email/${userID}`,
      { code }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const sendVerificationCode = async (email: string) => {
  try {
    const response = await axios.post(
      `${server_url}/api/auth/send-verification-code`,
      { email }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
