import { AxiosError } from "axios";
import AxiosInstance from "@/config/AxiosService";

interface ICreateOrder {
  amount: number;
  currency: 'INR' | 'USD';
  decks: number;
}
export async function CREATE_ORDER(data: ICreateOrder) {
  try {
    const response = await AxiosInstance.post("/payment/create-order", data);

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

interface ICompleteOrder {
  subscriptionId: string;
}
export async function COMPLETE_ORDER(data: ICompleteOrder) {
  try {
    const response = await AxiosInstance.post("/payment/complete-order", data);

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