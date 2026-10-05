const PUBLIC_SOLANA_RPC_URL = import.meta.env.PUBLIC_SOLANA_RPC_URL || import.meta.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

export async function fetchSolanaStatus() {
  try {
    const response = await fetch(PUBLIC_SOLANA_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getLatestBlockhash',
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.result ?? null;
  } catch {
    return null;
  }
}

export async function fetchWalletSnapshot(address: string) {
  try {
    const response = await fetch(PUBLIC_SOLANA_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [address],
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.result ?? null;
  } catch {
    return null;
  }
}
