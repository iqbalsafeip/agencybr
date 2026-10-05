const agents = [
  { name: 'AGENT_017', type: 'TRADER', status: 'ACTIVE', pnl: '+$18.6k', winRate: '72%' },
  { name: 'AGENT_083', type: 'RESEARCH', status: 'RESEARCH', pnl: '+$9.7k', winRate: '67%' },
];

export function AgentTable() {
  return (
    <div className="surface rounded-2xl p-4">
      <div className="mono text-[10px] uppercase tracking-[0.26em] text-[#a7b0aa]">AGENT TABLE</div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[#dfe8e3]">
          <thead className="text-[#a7b0aa]">
            <tr>
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">P&L</th>
              <th className="pb-3">Win rate</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.name} className="border-t border-white/10">
                <td className="py-3 pr-4 text-white">{agent.name}</td>
                <td className="py-3 pr-4">{agent.type}</td>
                <td className="py-3 pr-4">{agent.status}</td>
                <td className="py-3 pr-4">{agent.pnl}</td>
                <td className="py-3">{agent.winRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
