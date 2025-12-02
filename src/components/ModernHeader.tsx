import AIRobotLogo from './AIRobotLogo';

export default function ModernHeader() {
  return (
    <div className="text-center animate-fadeIn relative -mt-12 md:-mt-16">
      <div className="relative z-20">
        <AIRobotLogo />
      </div>

      <div className="relative -mt-24 z-30">
        <div className="inline-block bg-gradient-to-r from-slate-secondary to-slate-light text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-lg">
          無料情報ツール • 登録不要
        </div>
        <p className="text-base md:text-lg text-white leading-relaxed px-4 drop-shadow-lg font-medium">
          <span className="font-semibold text-slate-pale">コード</span>を入力して
          <br />
          <span className="font-semibold text-accent-amber-light">AI分析レポート</span>を参考に
          <br />
          投資判断の材料として活用
        </p>
        <p className="text-xs md:text-sm text-slate-lighter/90 mt-2 drop-shadow-lg">
          ※助言ではありません • 参考情報の提供
        </p>
      </div>
    </div>
  );
}
