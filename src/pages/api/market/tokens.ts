import type { APIRoute } from 'astro';
import { fetchCoinGeckoMarket } from '../../../lib/api/coingecko';

export const GET: APIRoute = async () => {
  const market = await fetchCoinGeckoMarket();

  const payload = {
    data: market ?? {
      active_cryptocurrencies: 0,
      markets: 0,
      total_market_cap: { usd: 0 },
      total_volume: { usd: 0 },
      market_cap_percentage: {},
    },
    source: 'COINGECKO',
    updatedAt: new Date().toISOString(),
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
