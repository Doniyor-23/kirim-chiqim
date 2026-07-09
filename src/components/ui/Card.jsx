export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 shadow-xl shadow-black/20 ${
        hover ? 'transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
