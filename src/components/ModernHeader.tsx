import AIRobotLogo from './AIRobotLogo';

export default function ModernHeader() {
  return (
    <div className="text-center animate-fadeIn relative -mt-12 md:-mt-16">
      <div className="relative z-20">
        <AIRobotLogo />
      </div>

      <div className="relative -mt-24 z-30">
        <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-lg">
          無料情報ツール • 登録不要
        </div>
        <p className="text-base md:text-lg text-white leading-relaxed px-4 drop-shadow-lg font-medium">
          <span className="font-semibold text-cyan-300">株式コード</span>を入力して
          <br />
          <span className="font-semibold text-blue-300">AI分析レポート</span>を参考に
          <br />
          投資判断の材料として活用
        </p>
        <p className="text-xs md:text-sm text-cyan-200/90 mt-2 drop-shadow-lg">
          ※投資助言ではありません • 参考情報の提供
        </p>
      </div>
    </div>
  );
}
