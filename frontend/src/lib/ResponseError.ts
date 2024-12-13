"use client";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const ResponseError = (error: Error) => {
  if (
    error instanceof AxiosError &&
    error?.response?.data &&
    error?.response?.data?.message
  ) {
    toast.error(error.response.data.message);
  }
};
