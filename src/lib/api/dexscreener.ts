const DEXSCREENER_API_URL = import.meta.env.DEXSCREENER_API_URL || 'https://api.dexscreener.com';

export async function fetchDexScreenerMarket(query: string) {
  try {
    const response = await fetch(`${DEXSCREENER_API_URL}/latest/dex/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data?.pairs?.[0] ?? null;
  } catch {
    return null;
  }
}
