export const fetchData = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      apiKey: `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    ...options,
  });
  return response.json();
};
