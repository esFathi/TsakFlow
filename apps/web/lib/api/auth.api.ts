// Auth API requests.

import { apiClient } from "./client";

import { RegisterRequest, RegisterResponse } from "@/types";

export const registerUser = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiClient.post("/auth/register", data);

  return response.data;
};
