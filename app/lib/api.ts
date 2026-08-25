export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!res.ok) {
      let errorMessage = `API error: ${res.status} ${res.statusText}`;
      try {
        const errorData = await res.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // Ignore json parse error if the response is not json
      }
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};
