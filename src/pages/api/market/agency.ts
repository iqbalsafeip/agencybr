import type { APIRoute } from 'astro';
import { fetchDexScreenerMarket } from '../../../lib/api/dexscreener';
import { fallbackMarket } from '../../../lib/fallbackData';

export const GET: APIRoute = async () => {
  const tokenAddress = import.meta.env.PUBLIC_AGENCY_TOKEN_ADDRESS;
  const market = tokenAddress ? await fetchDexScreenerMarket(tokenAddress) : null;

  const payload = {
    ...fallbackMarket,
    price: market?.price ?? null,
    change24h: market?.priceChange?.h24 ?? null,
    marketCap: market?.marketCap ?? null,
    volume24h: market?.volume?.h24 ?? null,
    liquidity: market?.liquidity?.usd ?? null,
    source: tokenAddress ? 'DEXSCREENER' : 'CONFIGURATION',
    updatedAt: new Date().toISOString(),
    status: tokenAddress ? 'live' : 'demo',
    mintAddress: tokenAddress ?? 'TOKEN NOT CONFIGURED',
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
