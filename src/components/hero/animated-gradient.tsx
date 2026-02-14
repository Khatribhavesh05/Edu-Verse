export function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 animate-gradient-slow"
        style={{
          backgroundSize: '400% 400%',
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(124,92,255,0.18), transparent 45%),
          radial-gradient(circle at 80% 70%, rgba(59,130,246,0.15), transparent 45%),
          linear-gradient(135deg, #dcd6ff, #cfc8ff, #c4d2ff)`
        }}
      />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

      <style jsx>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          animation: gradient-slow 20s ease infinite;
        }
      `}</style>
    </div>
  );
}
