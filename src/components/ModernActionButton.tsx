interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isFromAd?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false, isFromAd = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="relative animate-fadeIn mt-6" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full text-gray-900 font-bold py-4 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            backgroundColor: disabled ? '#D1D5DB' : '#FFC93C',
            height: '56px'
          }}
        >
          <span className="text-lg">{isFromAd ? '無料でAI分析を開始' : '分析を開始する'}</span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          ※本分析は情報提供のみを目的としており、特定の行動や判断を推奨するものではありません。情報の利用はご自身の責任で行ってください。
        </p>
      </div>
    </>
  );
}
