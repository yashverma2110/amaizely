import AuthenticatedAxiosInstance from "@/config/AutheticatedAxiosService";
import { AxiosError } from "axios";

export async function CREATE_DECK({ title, description, visibility }: any) {
  try {
    const response = await AuthenticatedAxiosInstance.post("/deck/create", {
      title,
      description,
      visibility
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