export const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
  additionalHeaders: HeadersInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      apiKey: `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      ...additionalHeaders,
    },
    ...options,
  });
  return response.json();
};
