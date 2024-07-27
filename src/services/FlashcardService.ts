import AxiosInstance from "@/config/AxiosService";
import { AxiosError } from "axios";

export async function GET_FLASHCARDS_FOR_REVISION() {
  try {
    const response = await AxiosInstance.get("/flashcards/revise")

    return {
      success: true,
      flashcards: response.data.flashcards
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        status: error.response?.status,
        message: error.response?.data.message
      }
    }

    return {
      success: false,
      error,
    }
  }
}