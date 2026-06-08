import { useCountUp } from "@/hooks/use-count-up";

type Stat = { value: number; suffix?: string; label: string };

function StatItem({ s }: { s: Stat }) {
  const { ref, value } = useCountUp(s.value);
  return (
    <div className="text-center">
      <div className="font-display text-5xl font-bold text-gold md:text-6xl">
        <span ref={ref}>{value}</span>
        {s.suffix ?? "+"}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70 md:text-sm">
        {s.label}
      </div>
    </div>
  );
}

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-navy py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:divide-x md:divide-gold/20">
        {stats.map((s) => (
          <div key={s.label} className="md:px-6">
            <StatItem s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}
