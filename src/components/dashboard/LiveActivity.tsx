import { useEffect, useState } from 'react';

interface ActivityEvent {
  time: string;
  type: string;
  entity: string;
  value: string;
  status: string;
}

export function LiveActivity() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/activity');
        const data = await response.json();
        setEvents(data.events ?? []);
      } catch {
        setEvents([]);
      }
    };

    load();
    const timer = window.setInterval(load, 15000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside className="space-y-4 rounded-2xl border border-white/10 bg-[#0b0b0b] p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.2em] text-[#a7b0aa]">Live Activity</div>
          <h3 className="mt-2 text-lg font-semibold text-white">INTELLIGENCE FEED</h3>
        </div>
        <div className="status-indicator"><span className="status-dot"></span> Live</div>
      </div>

      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 p-3 text-sm text-[#a7b0aa]">No live events yet. Data source unavailable.</div>
        ) : (
          events.map((event, index) => (
            <div key={`${event.type}-${index}`} className="rounded-xl border border-white/10 bg-[#111111] p-3">
              <div className="flex items-center justify-between gap-2"> 
                <div className="mono text-[9px] uppercase tracking-[0.18em] text-[#7CFFB2]">{event.type}</div>
                <div className="mono text-[9px] uppercase tracking-[0.18em] text-[#a7b0aa]">{event.status}</div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-white">{event.entity}</div>
                  <div className="mono text-[10px] uppercase tracking-[0.16em] text-[#a7b0aa]">{event.time}</div>
                </div>
                <div className="text-right text-sm text-[#dfe8e3]">{event.value}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
