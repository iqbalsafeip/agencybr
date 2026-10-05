import type { APIRoute } from 'astro';
import { fallbackNetwork } from '../../lib/fallbackData';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ ...fallbackNetwork, source: 'CONFIGURATION' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
