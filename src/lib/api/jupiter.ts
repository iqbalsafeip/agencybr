const JUPITER_API_URL = import.meta.env.JUPITER_API_URL || 'https://lite-api.jup.ag';

export async function fetchJupiterTokenInfo(query: string) {
  try {
    const response = await fetch(`${JUPITER_API_URL}/tokens/v1/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data?.data?.[0] ?? null;
  } catch {
    return null;
  }
}
