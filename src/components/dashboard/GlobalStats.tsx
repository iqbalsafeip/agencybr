import type { MarketSnapshot, NetworkStatus } from '../../lib/types';

interface GlobalStatsProps {
  market: MarketSnapshot | null;
  network: NetworkStatus | null;
  loading: boolean;
}

export function GlobalStats({ market, network, loading }: GlobalStatsProps) {
  const metrics = [
    { label: 'ACTIVE AGENTS', value: '127', detail: 'LIVE' },
    { label: 'LIVE SIGNALS', value: '18', detail: 'ACTIVE' },
    { label: 'NETWORK ACTIVITY', value: network?.block ? `${network.block.toLocaleString()}` : '—', detail: 'BLOCK' },
    { label: 'TREASURY', value: market?.liquidity ? `$${(market.liquidity / 1000000).toFixed(1)}M` : 'CONFIG', detail: 'LIQUIDITY' },
    { label: '$AGENCY PRICE', value: market?.price ? `$${market.price.toFixed(4)}` : 'TOKEN NOT CONFIGURED', detail: 'DEXSCREENER' },
    { label: '24H VOLUME', value: market?.volume24h ? `$${(market.volume24h / 1000000).toFixed(1)}M` : '—', detail: 'REAL-TIME' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-card">
          <div className="mono text-[10px] uppercase tracking-[0.26em] text-[#a7b0aa]">{metric.label}</div>
          <div className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {loading ? 'SYNCING…' : metric.value}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[#7CFFB2]">{metric.detail}</div>
        </div>
      ))}
    </div>
  );
}
