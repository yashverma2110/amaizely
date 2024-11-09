import AxiosInstance from "@/config/AxiosService";
import type { IUser } from "@/types/IUser";
import { isProduction } from "@/utils/EnvUtils";
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
      status: err.response?.status,
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
  const domain = isProduction() ? 'https://www.amaizely.com' : 'http://localhost:3000'
  const response = await fetch(`${domain}/api/country`);
  const data = await response.json();
  return data;
}