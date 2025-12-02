import { ArrowLeft, Building, MapPin, Calendar, Briefcase, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">サービス概要</h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6 border-l-4 border-slate-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AIデータ分析サービス</h2>
                <p className="text-lg text-gray-700 mb-2">参考情報提供ツール</p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="font-bold text-gray-900 mb-4">サービスの特徴</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>・ AI技術を活用したデータ分析</li>
                  <li>・ 参考情報としての分析レポート提供</li>
                  <li>・ 無料でご利用いただけます</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">業種</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      デジタルマーケティング／広告戦略・運用／データ分析
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">免責事項</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  本サービスが提供する情報は参考情報であり、投資助言、投資推奨、または金融商品の勧誘を目的としたものではありません。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  投資判断は必ずご自身の責任と判断で行ってください。当サービスは投資結果に対するいかなる責任も負いません。
                </p>
              </div>
            </section>

            <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200 mt-8">
              <h3 className="font-bold text-gray-900 mb-3">お問い合わせ</h3>
              <p className="text-sm text-gray-700 mb-4">
                本サービスに関するお問い合わせは、お気軽にご連絡ください。
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold"
              >
                お問い合わせフォームへ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
