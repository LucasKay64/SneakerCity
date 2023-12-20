export const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
  additionalHeaders: HeadersInit = {}
): Promise<{ data: T; headers: Headers }> => {
  const response = await fetch(url, {
    headers: {
      apiKey: `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      ...additionalHeaders,
    },
    ...options,
  });
  const data = await response.json();
  return { data: data, headers: response.headers };
};
