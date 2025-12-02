import { Link } from 'react-router-dom';
import { Shield, Scale, FileText, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t-2 border-white/20 mt-12">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Legal Disclosure Section - Desktop */}
        <div className="hidden md:block bg-slate-800/90 backdrop-blur-sm border-2 border-slate-500/50 rounded-lg p-6 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="bg-slate-700/50 p-3 rounded-lg flex-shrink-0">
              <Shield className="w-6 h-6 text-slate-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                ご利用上の重要事項
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-slate-200">
                <div className="bg-slate-700/70 rounded p-3 border-l-4 border-slate-400">
                  <p className="font-bold text-slate-200 mb-2">【サービスの性質】</p>
                  <p>
                    本サービスは、AI技術を活用したデータ分析および情報提供ツールです。
                    <strong className="text-amber-400">提供される情報は参考情報であり、特定の行動や判断を推奨・勧誘するものではありません。</strong>
                  </p>
                </div>

                <div className="bg-slate-700/70 rounded p-3 border-l-4 border-amber-500">
                  <p className="font-bold text-amber-300 mb-2">【情報の利用について】</p>
                  <p>
                    本サービスで提供される情報を利用する際は、
                    <strong className="text-amber-400">必ずご自身の判断と責任において行ってください。</strong>
                    情報の利用により生じるいかなる結果についても、利用者ご自身が責任を負うものとします。
                  </p>
                </div>

                <div className="bg-slate-700/70 rounded p-3 border-l-4 border-blue-500">
                  <p className="font-bold text-blue-300 mb-2">【情報の正確性について】</p>
                  <p>
                    提供される情報は、信頼できると判断した情報源から取得していますが、
                    その正確性、完全性、適時性を保証するものではありません。
                    AI分析結果は参考情報として提供されるものであり、絶対的な判断基準ではありません。
                  </p>
                </div>

                <div className="bg-slate-700/70 rounded p-3 border-l-4 border-slate-500">
                  <p className="font-bold text-slate-300 mb-2">【免責事項】</p>
                  <p>
                    <strong className="text-amber-400">本サービスの利用により生じたいかなる損害についても、運営者は一切の責任を負いません。</strong>
                    重要な判断を行う際は、必ず専門家や関係機関にご相談ください。
                  </p>
                </div>

                <div className="bg-slate-700/50 rounded p-3 mt-4">
                  <p className="font-bold text-slate-200 mb-1">【サービス提供者】</p>
                  <p className="text-xs text-slate-300">
                    本サービスは情報提供を目的としたツールであり、専門的な助言や指導を提供するものではありません。
                    利用者は本サービスの性質を理解した上で、自己の責任においてご利用ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice - Mobile */}
        <div className="md:hidden bg-slate-500/10 backdrop-blur-md border border-slate-400/50 rounded-xl p-4 text-center mb-6">
          <p className="text-sm text-slate-200 font-semibold mb-1">⚠️ 重要なお知らせ</p>
          <p className="text-xs text-slate-100 leading-relaxed">
            当サービスは参考情報の提供のみを目的としており、特定の行動や判断を推奨するものではありません。情報の利用は必ずご自身の責任で行ってください。
          </p>
        </div>

        {/* Copyright Section */}
        <div className="border-t-2 border-white/30 pt-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-white drop-shadow-lg mb-2 font-medium">
              &copy; {currentYear} 本サービス. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-white/90 drop-shadow-lg leading-relaxed max-w-3xl mx-auto mb-4">
              当サイトで提供される情報は参考情報であり、特定の行動や判断を推奨するものではありません。
              情報の利用に関する最終決定は、利用者ご自身の判断と責任でなさるようお願いいたします。
              掲載されている情報の正確性については万全を期しておりますが、その内容の完全性、正確性、安全性、有用性、適時性を保証するものではありません。
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
