export default function ModernGradientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        }}
      />
    </div>
  );
}
