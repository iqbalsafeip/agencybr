interface BackroomRoomProps {
  roomId: string;
  title: string;
  status: string;
  locked?: boolean;
}

export function BackroomRoom({ roomId, title, status, locked = false }: BackroomRoomProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4">
      <div className="mono text-[10px] uppercase tracking-[0.2em] text-[#7CFFB2]">{roomId}</div>
      <div className="mt-2 text-xl font-semibold text-white">{title}</div>
      <div className="mt-3 text-sm text-[#dfe8e3]">STATUS: {status}</div>
      {locked ? <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#ff6b6b]">LOCKED</div> : <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#7CFFB2]">OPEN</div>}
    </div>
  );
}
