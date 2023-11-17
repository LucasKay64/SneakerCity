export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      apiKey: `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
  });
  return response.json();
};
