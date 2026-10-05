import type { APIRoute } from 'astro';
import { fetchSolanaStatus } from '../../../lib/api/solana';
import { fallbackNetwork } from '../../../lib/fallbackData';

export const GET: APIRoute = async () => {
  const result = await fetchSolanaStatus();
  const payload = result
    ? {
        status: 'ONLINE',
        network: 'SOLANA',
        block: result.context?.slot ?? null,
        rpcConnected: true,
        updatedAt: new Date().toISOString(),
        source: 'SOLANA RPC',
      }
    : {
        ...fallbackNetwork,
        rpcConnected: false,
        source: 'CONFIGURATION',
      };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
