import { useMemo, useState } from 'react';

const commands: Record<string, string> = {
  '/help': 'Available commands: /status /agents /signals /wallet /token /mission /treasury',
  '/status': 'SYSTEM ONLINE // NETWORK SOLANA // RPC CONNECTED',
  '/agents': '127 AGENTS // 14 ACTIVE MISSIONS // 3 ALERTS',
  '/signals': '18 ACTIVE SIGNALS // 2 MODEL GENERATED // 6 HEURISTIC',
  '/wallet': 'WALLET 7F31...MzQ9 // SOL 42.87 // TOKEN STATUS LIVE',
  '/token': '$AGENCY // TOKEN CONFIGURATION UNKNOWN // DATA SOURCE DISABLED',
  '/mission': 'MISSION THREAD: RECON // STAGE 02 // AGENT WATCHLIST LIVE',
  '/treasury': 'TREASURY WALLET NOT CONFIGURED // SOURCE CONFIGURATION',
};

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '> system status',
    'SYSTEM ONLINE',
    'NETWORK SOLANA',
    'RPC CONNECTED',
  ]);

  const placeholder = useMemo(() => 'AGENCY BACKROOMS TERMINAL', []);

  const handleSubmit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const response = commands[trimmed] ?? 'COMMAND NOT RECOGNIZED';
    setHistory((prev) => [...prev, `> ${trimmed}`, response]);
    setInput('');
  };

  return (
    <div className="surface terminal-glow rounded-2xl p-5">
      <div className="mono text-[10px] uppercase tracking-[0.28em] text-[#a7b0aa]">{placeholder}</div>
      <div className="mt-4 rounded-xl border border-[#7CFFB2]/20 bg-[#070707] p-4 font-mono text-sm text-[#dfe8e3]">
        <div className="space-y-2">
          {history.map((line, index) => (
            <div key={`${line}-${index}`}>{line}</div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-[#7CFFB2]">&gt;</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(input);
              }
            }}
            className="w-full border-none bg-transparent text-[#dfe8e3] outline-none"
            placeholder="type command..."
            aria-label="Terminal command input"
          />
        </div>
      </div>
    </div>
  );
}
