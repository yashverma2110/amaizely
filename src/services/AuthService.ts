import AxiosInstance from "@/config/AxiosService";
import type { IUser } from "@/types/IUser";
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
      user: response.data.user as IUser
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

export async function UPDATE_USER(data: { firstName: string, lastName: string }) {
  try {
    const response = await AxiosInstance.put("/auth/user", data);

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

export async function LOGOUT_USER() {
  try {
    const response = await AxiosInstance.get("/auth/logout");

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