import { AuthApiError } from "../errors/errors";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorData: any = await response.json();

    switch (response.status) {
      case 400:
        if (errorData.msg && errorData.msg === "User already registered") {
          throw new AuthApiError(errorData.msg);
        } else if (errorData.error && errorData.error === "invalid_grant") {
          throw new AuthApiError(errorData.error_description);
        }
        break;
      default:
        throw new Error(errorData.msg);
    }
  }

  const data = await response.json();
  return { data: data, headers: response.headers };
};
