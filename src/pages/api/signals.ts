import type { APIRoute } from 'astro';
import { demoSignals } from '../../lib/fallbackData';

export const GET: APIRoute = async () => {
  const payload = {
    signals: demoSignals,
    source: 'HEURISTIC SIGNAL',
    updatedAt: new Date().toISOString(),
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
