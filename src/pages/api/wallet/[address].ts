import type { APIRoute } from 'astro';
import { demoWallet } from '../../../lib/fallbackData';

export function getStaticPaths() {
  return [{ params: { address: '7F31...MzQ9' } }];
}

export const GET: APIRoute = async ({ params }) => {
  const address = params.address ?? 'unknown';
  const sanitized = typeof address === 'string' ? address.trim() : '';

  return new Response(
    JSON.stringify({
      ...demoWallet,
      address: sanitized || demoWallet.address,
      lastUpdated: new Date().toISOString(),
      source: 'SOLANA RPC',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
