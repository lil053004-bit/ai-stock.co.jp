export default function ModernGradientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #1a0a2e 50%, #2d1b4e 100%)'
        }}
      />
    </div>
  );
}
