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
    if (error instanceof AxiosError) {
      return {
        success: false,
        status: error.response?.status,
        message: error.response?.data.message
      }
    }

    return {
      success: false,
      status: err.response?.status,
      error: err.response?.data
    }
  }
}

export async function REGISTER_USER({ firstName, lastName, email, password, country }: any) {
  try {
    const response = await AxiosInstance.post("/auth/signup", {
      firstName,
      lastName,
      email,
      password,
      country
    });

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    const err = error as AxiosError;
    if (error instanceof AxiosError) {
      return {
        success: false,
        status: error.response?.status,
        message: error.response?.data.message
      }
    }

    return {
      success: false,
      status: err.response?.status,
      error: err.response?.data
    }
  }
}

export async function GET_USER() {
  try {
    const response = await AxiosInstance.get("/auth/user");

    return {
      success: true,
      user: response.data.user as IUser,
      country: response.data.country,
      region: response.data.region
    }
  } catch (error) {
    const err = error as AxiosError;
    if (error instanceof AxiosError) {
      return {
        success: false,
        status: error.response?.status,
        message: error.response?.data.message
      }
    }

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

export async function GET_COUNTRY() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    return {
      country: data.country_code,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}