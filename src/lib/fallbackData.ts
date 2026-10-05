import type { AgentRecord, MarketSnapshot, NetworkStatus, SignalRecord, TreasuryRecord, WalletRecord } from './types';

export const fallbackMarket: MarketSnapshot = {
  price: null,
  change24h: null,
  marketCap: null,
  volume24h: null,
  liquidity: null,
  source: 'CONFIGURATION',
  updatedAt: new Date().toISOString(),
  status: 'demo',
  mintAddress: import.meta.env.PUBLIC_AGENCY_TOKEN_ADDRESS || undefined,
};

export const fallbackNetwork: NetworkStatus = {
  status: 'ONLINE',
  network: 'SOLANA',
  block: null,
  rpcConnected: false,
  updatedAt: new Date().toISOString(),
  source: 'CONFIGURATION',
};

export const demoAgents: AgentRecord[] = [
  {
    id: 'AGENT_017',
    name: 'AGENT_017',
    type: 'TRADER',
    status: 'ACTIVE',
    wallet: '7F31...MzQ9',
    treasury: 128500,
    pnl: 18560,
    winRate: 72,
    missions: 14,
    reputation: 94,
    createdAt: '2025-01-12',
    lastActivity: '2 min ago',
  },
  {
    id: 'AGENT_083',
    name: 'AGENT_083',
    type: 'RESEARCH',
    status: 'RESEARCH',
    wallet: '2B3D...KQ4F',
    treasury: 90200,
    pnl: 9650,
    winRate: 67,
    missions: 9,
    reputation: 88,
    createdAt: '2025-02-09',
    lastActivity: '11 min ago',
  },
];

export const demoSignals: SignalRecord[] = [
  {
    id: 'SIG-2401',
    timestamp: new Date().toISOString(),
    type: 'WHALE MOVEMENT',
    confidence: 86,
    asset: '$AGENCY',
    wallet: '7F31...MzQ9',
    description: 'Large wallet moved 18.2k tokens through a clustered liquidity route.',
    severity: 'HIGH',
    source: 'MODEL GENERATED',
  },
  {
    id: 'SIG-2402',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    type: 'VOLUME SPIKE',
    confidence: 74,
    asset: 'SOL',
    wallet: '3A7C...2XW1',
    description: 'Volume surged across the SOL/USD pair after a regional flow rebalancing event.',
    severity: 'MEDIUM',
    source: 'HEURISTIC SIGNAL',
  },
];

export const demoWallet: WalletRecord = {
  address: '7F31qXr8C5bK9mN2W4yVd7A6Z8jT3fL2cP1Q6nR9mK4',
  solBalance: 42.87,
  tokenBalances: [
    { symbol: '$AGENCY', amount: 18342.21, usdValue: 22500 },
    { symbol: 'SOL', amount: 12.4, usdValue: 3140 },
    { symbol: 'USDC', amount: 6800, usdValue: 6800 },
  ],
  recentTransactions: [
    { hash: '0x83a1', type: 'TOKEN MOVEMENT', amount: 1200, time: '2m ago' },
    { hash: '0x12fd', type: 'SWAP', amount: 540, time: '18m ago' },
  ],
  lastUpdated: new Date().toISOString(),
};

export const demoTreasury: TreasuryRecord = {
  totalValue: null,
  assetAllocation: [
    { label: 'STABLES', value: 42, color: '#7CFFB2' },
    { label: 'SOL', value: 31, color: '#FFC46B' },
    { label: 'AGENCY', value: 27, color: '#FF6B6B' },
  ],
  inflows: null,
  outflows: null,
  recentTransactions: [
    { id: 'TX-101', type: 'INFLOW', amount: 18000, time: '12m ago' },
    { id: 'TX-102', type: 'OUTFLOW', amount: 7600, time: '38m ago' },
  ],
  configured: false,
  source: 'CONFIGURATION',
};

export const recentActivity = [
  { time: '12:08:43', type: 'NEW TRANSACTION', entity: 'AGENT_017', value: '+2.40 SOL', status: 'REAL DATA' },
  { time: '12:07:55', type: 'TOKEN MOVEMENT', entity: '$AGENCY', value: '+18.2k', status: 'MODEL GENERATED' },
  { time: '12:06:02', type: 'WALLET ACTIVITY', entity: '7F31...MzQ9', value: '0.31 SOL', status: 'REAL DATA' },
  { time: '12:04:18', type: 'MARKET CHANGE', entity: 'SOL/USD', value: '+3.2%', status: 'LIVE DATA' },
  { time: '12:02:30', type: 'AGENT EVENT', entity: 'AGENT_083', value: 'Mission update', status: 'SIMULATED' },
];
