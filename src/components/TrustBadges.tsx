import { Shield, Lock, Zap, TrendingUp } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-slate-secondary/20 to-slate-primary/20 backdrop-blur-md border border-slate-light/40 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-slate-secondary to-slate-primary p-2 rounded-full">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-pale drop-shadow-lg">無料提供</p>
          <p className="text-[10px] text-slate-lighter/80 drop-shadow-lg">追加費用なし</p>
        </div>

        <div className="bg-gradient-to-br from-slate-light/20 to-slate-secondary/20 backdrop-blur-md border border-slate-lighter/40 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-slate-light to-slate-secondary p-2 rounded-full">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-pale drop-shadow-lg">情報保護</p>
          <p className="text-[10px] text-slate-lighter/80 drop-shadow-lg">データ安全</p>
        </div>

        <div className="bg-gradient-to-br from-accent-emerald/20 to-accent-emerald-light/20 backdrop-blur-md border border-accent-emerald-light/40 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-accent-emerald to-accent-emerald-light p-2 rounded-full">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-pale drop-shadow-lg">迅速処理</p>
          <p className="text-[10px] text-slate-lighter/80 drop-shadow-lg">高速分析</p>
        </div>

        <div className="bg-gradient-to-br from-accent-amber/20 to-accent-amber-light/20 backdrop-blur-md border border-accent-amber-light/40 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-r from-accent-amber to-accent-amber-light p-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-pale drop-shadow-lg">参考情報</p>
          <p className="text-[10px] text-slate-lighter/80 drop-shadow-lg">AI分析結果</p>
        </div>
      </div>
    </div>
  );
}
