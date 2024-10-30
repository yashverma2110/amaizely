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
  _id?: string;
  title: string;
  content: string;
  hidden?: boolean;
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

export async function GENERATE_FLASHCARDS_FROM_TEXT(content: string) {
  try {
    const response = await AxiosInstance.post(`/flashcards/generate/text`, {
      content,
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

export async function CREATE_DECK_WITH_FLASHCARDS(payload: {
  title: string;
  description: string;
  visibility?: 'public' | 'private',
  isDraft?: boolean,
  flashcards: {
    title: string;
    content: string;
    order: number;
  }[]
}) {
  try {
    const response = await AxiosInstance.post("/deck/create", payload)

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

export async function GET_DECK_AND_DECK_CARDS_WITH_ID(deckId: string) {
  try {
    const response = await AxiosInstance.get(`/deck/${deckId}`)

    return {
      success: true,
      deck: response.data.deck,
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

export async function SAVE_DECK_AND_DECK_CARDS_WITH_ID(deckId: string) {
  try {
    const response = await AxiosInstance.post(`/deck/${deckId}/save`)

    return {
      success: true,
      deck: response.data.deck,
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

export async function UPDATE_DECK_AND_DECK_CARDS_BY_ID(deckId: string, deck: any, flashcards: any) {
  try {
    const response = await AxiosInstance.put(`/deck/${deckId}/update`, {
      deck,
      flashcards
    })

    return {
      success: true,
      deck: response.data.deck,
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

export async function DELETE_DECK_WITH_ID(deckId: string) {
  try {
    const response = await AxiosInstance.delete(`/deck/delete/${deckId}`)

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