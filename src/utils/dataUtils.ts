import { ApiError } from "../errors/ApiError";
import { ApiErrorType } from "../types/dataTypes";

export const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
  additionalHeaders: HeadersInit = {}
): Promise<{ data: T; headers: Headers }> => {
  const response = await fetch(url, {
    headers: {
      apikey: `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      ...additionalHeaders,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData: ApiErrorType = await response.json();
    throw new ApiError(errorData.code, errorData.msg);
  }

  const data = await response.json();
  return { data: data, headers: response.headers };
};
