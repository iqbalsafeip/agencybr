import type { APIRoute } from 'astro';
import { demoAgents } from '../../lib/fallbackData';

export const GET: APIRoute = async () => {
  const payload = {
    mode: 'SIMULATION MODE',
    agents: demoAgents,
    updatedAt: new Date().toISOString(),
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
