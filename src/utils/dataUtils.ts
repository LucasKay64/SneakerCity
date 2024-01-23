import { AuthApiError } from "../errors/errors";

export const fetchData = async <T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T; headers: Headers }> => {
  const modifiedHeaders = {
    apikey: `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    ...options?.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: modifiedHeaders,
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

  let data = null;
  if (response.headers.get("Content-Type")?.includes("application/json")) {
    data = await response.json();
  }
  return { data: data, headers: response.headers };
};
