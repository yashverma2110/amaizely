import AxiosInstance from "@/config/AxiosService";
import { AxiosError } from "axios";

export async function LOG_VIEW_FOR_FLASHCARD(flashcardId: string) {
  try {
    const response = await AxiosInstance.put(`/user-activity/view`, {
      flashcardId,
    });

    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message
      }
    }

    return {
      success: false,
      message: 'An error occurred while logging view'
    }
  }
}