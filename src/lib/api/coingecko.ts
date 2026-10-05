const COINGECKO_API_URL = import.meta.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';

export async function fetchCoinGeckoMarket() {
  try {
    const response = await fetch(`${COINGECKO_API_URL}/global`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data?.data ?? null;
  } catch {
    return null;
  }
}
