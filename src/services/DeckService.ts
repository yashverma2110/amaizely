import AxiosInstance from "@/config/AxiosService";
import { AxiosError } from "axios";

export async function GET_MY_DECKS() {
  try {
    const response = await AxiosInstance.get("/deck/me")

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

export async function GET_DECK_AND_DECK_CARDS(deckId: string) {
  try {
    const response = await AxiosInstance.get(`/flashcards/${deckId}`)

    return {
      success: true,
      deck: response.data
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

export interface IFlashcard {
  topic: string;
  content: string;
}
export async function GENERATE_FLASHCARDS_FROM_YOUTUBE(videoId: string) {
  try {
    const response = await AxiosInstance.post(`/flashcards/generate/transcript/${videoId}`, {
      options: {
        deckSize: 5,
      }
    })

    return {
      success: true,
      flashcards: response.data.flashcards as IFlashcard[]
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

export async function GENERATE_FLASHCARDS_FROM_WEBSITE(website: string) {
  try {
    const response = await AxiosInstance.post(`/flashcards/generate/website`, {
      website,
      options: {
        deckSize: 5,
      }
    })

    return {
      success: true,
      flashcards: response.data.flashcards as IFlashcard[]
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