import type { APIRoute } from 'astro';
import { demoTreasury } from '../../lib/fallbackData';

export const GET: APIRoute = async () => {
  const treasuryWallet = import.meta.env.PUBLIC_TREASURY_WALLET;
  const payload = {
    ...demoTreasury,
    configured: Boolean(treasuryWallet),
    source: treasuryWallet ? 'SOLANA RPC' : 'CONFIGURATION',
    totalValue: treasuryWallet ? null : null,
    inflows: treasuryWallet ? null : null,
    outflows: treasuryWallet ? null : null,
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
