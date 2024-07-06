import AxiosInstance from "@/config/AxiosService";
import { AxiosError } from "axios";

export async function getMyDecks(sid: string) {
  try {
    const response = await AxiosInstance.get("/deck/me", {
      headers: {
        Cookie: `sid=${sid}`
      },
    })

    return {
      success: true,
      data: response.data
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