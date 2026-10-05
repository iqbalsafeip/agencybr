import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useRealtimeData } from '../../lib/useRealtimeData';
import type { MarketSnapshot, NetworkStatus } from '../../lib/types';
import { GlobalStats } from './GlobalStats';

const chartSeries = [
  { label: '00:00', value: 20 },
  { label: '02:00', value: 22 },
  { label: '04:00', value: 18 },
  { label: '06:00', value: 28 },
  { label: '08:00', value: 26 },
  { label: '10:00', value: 34 },
  { label: '12:00', value: 31 },
  { label: '14:00', value: 42 },
];

async function fetchMarket(): Promise<MarketSnapshot> {
  const response = await fetch('/api/market/agency');
  if (!response.ok) throw new Error('Market unavailable');
  return response.json();
}

async function fetchNetwork(): Promise<NetworkStatus> {
  const response = await fetch('/api/network');
  if (!response.ok) throw new Error('Network unavailable');
  return response.json();
}

export function CommandCenter() {
  const marketFetch = useRealtimeData(fetchMarket, { interval: 12000, initialData: null as unknown as MarketSnapshot });
  const networkFetch = useRealtimeData(fetchNetwork, { interval: 8000, initialData: null as unknown as NetworkStatus });

  const market = marketFetch.data ?? null;
  const network = networkFetch.data ?? null;

  const statusText = useMemo(() => {
    if (market?.price) return `DATA CONNECTION ● LIVE`;
    return `DATA SOURCE UNAVAILABLE`;
  }, [market]);

  return (
    <div className="space-y-5">
      <div className="surface rounded-2xl p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mono text-[10px] uppercase tracking-[0.28em] text-[#a7b0aa]">System online</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-wide text-white">SOLANA / LIVE DATA</h2>
          </div>
          <div className="status-indicator"><span className="status-dot"></span>{statusText}</div>
        </div>
      </div>

      <GlobalStats market={market} network={network} loading={marketFetch.loading || networkFetch.loading} />

      <div className="grid gap-5 xl:grid-cols-[1.8fr_0.9fr]">
        <div className="surface rounded-2xl p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mono text-[10px] uppercase tracking-[0.26em] text-[#a7b0aa]">Market Intelligence</div>
              <div className="mt-2 text-lg font-semibold text-white">$AGENCY / SIGNAL FLOW</div>
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-[#7CFFB2]">SOURCE: {market?.source ?? 'CONFIGURATION'}</div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartSeries}>
                <defs>
                  <linearGradient id="signalFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#7CFFB2" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#7CFFB2" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" stroke="#a7b0aa" tickLine={false} axisLine={false} />
                <YAxis stroke="#a7b0aa" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#111111', border: '1px solid rgba(124,255,178,0.2)', borderRadius: 12 }}
                  labelStyle={{ color: '#edf4f0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#7CFFB2" strokeWidth={2.5} fill="url(#signalFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface rounded-2xl p-4 md:p-5">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-[#a7b0aa]">System callout</div>
          <div className="mt-3 space-y-3 text-sm text-[#dfe8e3]">
            <div className="rounded-xl border border-[#7CFFB2]/20 bg-[#0d0d0d] p-3">
              <div className="text-[#7CFFB2]">NETWORK</div>
              <div className="mt-1 text-lg font-semibold text-white">{network?.network ?? 'SOLANA'}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-3">
              <div className="text-[#ffc46b]">BLOCK</div>
              <div className="mt-1 text-lg font-semibold text-white">{network?.block ?? 'UNAVAILABLE'}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-3">
              <div className="text-[#ff6b6b]">AGENTS</div>
              <div className="mt-1 text-lg font-semibold text-white">127 LIVE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
