export type LiveStatus = 'live' | 'stale' | 'offline' | 'simulated' | 'demo';

export interface MarketSnapshot {
  price: number | null;
  change24h: number | null;
  marketCap: number | null;
  volume24h: number | null;
  liquidity: number | null;
  source: string;
  updatedAt: string;
  status: LiveStatus;
  mintAddress?: string;
}

export interface AgentRecord {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'RESEARCH' | 'HOLD' | 'SIMULATED';
  wallet: string;
  treasury: number;
  pnl: number;
  winRate: number;
  missions: number;
  reputation: number;
  createdAt: string;
  lastActivity: string;
}

export interface SignalRecord {
  id: string;
  timestamp: string;
  type: string;
  confidence: number;
  asset: string;
  wallet: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  source: 'MODEL GENERATED' | 'HEURISTIC SIGNAL' | 'LIVE DATA';
}

export interface WalletRecord {
  address: string;
  solBalance: number;
  tokenBalances: Array<{ symbol: string; amount: number; usdValue: number }>;
  recentTransactions: Array<{ hash: string; type: string; amount: number; time: string }>;
  lastUpdated: string;
}

export interface TreasuryRecord {
  totalValue: number | null;
  assetAllocation: Array<{ label: string; value: number; color: string }>;
  inflows: number | null;
  outflows: number | null;
  recentTransactions: Array<{ id: string; type: string; amount: number; time: string }>;
  configured: boolean;
  source: string;
}

export interface NetworkStatus {
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  network: string;
  block: number | null;
  rpcConnected: boolean;
  updatedAt: string;
  source: string;
}
