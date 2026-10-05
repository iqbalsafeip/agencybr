import type { APIRoute } from 'astro';
import { recentActivity } from '../../lib/fallbackData';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ events: recentActivity, updatedAt: new Date().toISOString() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
