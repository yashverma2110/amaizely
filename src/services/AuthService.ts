import AxiosInstance from "@/config/AxiosUtils";
import { AxiosError } from "axios";

export async function LOGIN_USER({ email, password }: any) {
  try {
    const response = await AxiosInstance.post("/auth/login", {
      email,
      password
    });

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    const err = error as AxiosError;

    return {
      success: false,
      status: err.status,
      error: err.response?.data
    }
  }
}

export async function REGISTER_USER({ firstName, lastName, email, password }: any) {
  try {
    const response = await AxiosInstance.post("/auth/signup", {
      firstName,
      lastName,
      email,
      password
    });

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    const err = error as AxiosError;

    return {
      success: false,
      status: err.status,
      error: err.response?.data
    }
  }
}

export async function GET_USER() {
  try {
    const response = await AxiosInstance.get("/auth/user");

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    const err = error as AxiosError;

    return {
      success: false,
      status: err.status,
      error: err.response?.data
    }
  }
}