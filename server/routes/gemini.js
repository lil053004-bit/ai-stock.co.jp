import express from 'express';
import dotenv from 'dotenv';
import { getCachedDiagnosis, saveDiagnosisToCache } from '../utils/sqliteCache.js';
import { getRateLimitStatus } from '../utils/rateLimiter.js';
import { recordUsageStats } from '../utils/sqliteStats.js';

dotenv.config();

const router = express.Router();

router.post('/diagnosis', async (req, res) => {
  const startTime = Date.now();

  try {
    const { code, stockData } = req.body;

    console.log('Diagnosis request received for stock:', code);

    if (!code) {
      console.error('Missing required parameters:', { code });
      await recordUsageStats({ requests_total: 1, cache_hits: 0, api_calls: 0, errors_count: 1 });
      return res.status(400).json({ error: 'Stock code is required' });
    }

    const cachedResult = await getCachedDiagnosis(code);
    if (cachedResult) {
      console.log(`Returning cached result for ${code}`);
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ requests_total: 1, cache_hits: 1, api_calls: 0, errors_count: 0 });
      return res.json({
        analysis: cachedResult.diagnosis_result,
        cached: true,
        cachedAt: cachedResult.created_at,
        expiresAt: cachedResult.expires_at
      });
    }

    const apiKeysString = process.env.SILICONFLOW_API_KEY || process.env.SILICONFLOW_API_KEYS;
    const siliconflowApiUrl = process.env.SILICONFLOW_API_URL || 'https://api.siliconflow.cn/v1/chat/completions';
    const siliconflowModel = process.env.SILICONFLOW_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

    if (!apiKeysString) {
      console.warn('SILICONFLOW_API_KEY not configured, using mock response');

      const changePercent = parseFloat(stockData.changePercent.replace('%', ''));
      const absChangePercent = Math.abs(changePercent);

      let volatilityLevel = '中水準';
      if (absChangePercent >= 2) volatilityLevel = '高水準';
      else if (absChangePercent < 0.5) volatilityLevel = '低水準';

      let rsi = 50;
      if (changePercent > 1) rsi = Math.floor(65 + Math.random() * 15);
      else if (changePercent > 0) rsi = Math.floor(55 + Math.random() * 10);
      else if (changePercent < -1) rsi = Math.floor(30 + Math.random() * 15);
      else if (changePercent < 0) rsi = Math.floor(40 + Math.random() * 10);
      else rsi = Math.floor(45 + Math.random() * 10);

      let technicalStatus = '中立';
      if (rsi >= 70) technicalStatus = '過買い';
      else if (rsi <= 30) technicalStatus = '過売り';

      let trendPrediction = '横ばいの';
      if (rsi >= 70) trendPrediction = '回調へのつながる';
      else if (rsi <= 30) trendPrediction = '反発の可能性がある';
      else if (changePercent > 0.5) trendPrediction = '上昇トレンド継続の';
      else if (changePercent < -0.5) trendPrediction = '調整局面に入る';

      const mockAnalysis = `【AI診断】ご入力いただいた${stockData.name}について、モメンタム分析・リアルタイムデータ・AIロジックをもとに診断を行いました。\n\n現在の株価は${stockData.price}円、前日比${stockData.change}円（${stockData.changePercent}）。\n\n現在、短期ボラティリティ指標が過去30日の平均と比較して${volatilityLevel}に達しています。AIの分析によると、テクニカルは${technicalStatus}（RSI[${rsi}%]）が優勢となっており、${trendPrediction}傾向が見られます。\n\n私たちのスタッフ、「AI株式診断アシスタント」のLINEアカウントを追加してください。\n\n追加が完了しましたら、詳細診断レポートを受け取るために、銘柄コード「${stockData.name}」または【${code}】を送信してください。`;

      await saveDiagnosisToCache(code, stockData, mockAnalysis, 'mock');
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ requests_total: 1, cache_hits: 0, api_calls: 0, errors_count: 0 });
      return res.json({ analysis: mockAnalysis, cached: false, mock: true });
    }

    const apiKeys = apiKeysString.split(',').map(k => k.trim()).filter(k => k);
    const selectedApiKey = apiKeys[0];

    console.log('SiliconFlow API Key selected, making streaming API request...');
    console.log('Using model:', siliconflowModel);

    let prompt;

    if (stockData) {
      prompt = `あなたは日本の株式市場アナリストです。以下の株式データに基づいて、指定されたフォーマットで診断結果を日本語で作成してください。

株式情報：
銘柄名: ${stockData.name}
コード: ${code}
現在株価: ${stockData.price}円
前日比: ${stockData.change}円 (${stockData.changePercent})
PER: ${stockData.per}倍
PBR: ${stockData.pbr}倍
配当利回り: ${stockData.dividend}%
業種: ${stockData.industry}
時価総額: ${stockData.marketCap}億円

必ず以下のフォーマットで出力してください：

【AI診断】ご入力いただいた${stockData.name}について、モメンタム分析・リアルタイムデータ・AIロジックをもとに診断を行いました。

現在の株価は${stockData.price}円、前日比${stockData.change}円（${stockData.changePercent}）。

現在、短期ボラティリティ指標が過去30日の平均と比較して[低水準/中水準/高水準]に達しています。AIの分析によると、テクニカルは[過買い/過売り/中立]（RSI[XX%]）が優勢となっており、[回調へのつながる/反発の可能性がある/横ばいの/上昇トレンド継続の]傾向が見られます。

私たちのスタッフ、「AI株式診断アシスタント」のLINEアカウントを追加してください。

追加が完了しましたら、詳細診断レポートを受け取るために、銘柄コード「${stockData.name}」または【${code}】を送信してください。

重要指示:
1. このフォーマットを厳密に守ってください
2. ボラティリティ水準は株価変動率(${stockData.changePercent})に基づいて判断：±2%以上=高水準、±0.5%-2%=中水準、±0.5%未満=低水準
3. RSI値は30-80の範囲で株価動向に基づいて設定：上昇傾向=60-80、下降傾向=30-50、横ばい=45-55
4. テクニカル状態はRSI値に基づいて：70以上=過買い、30以下=過売り、30-70=中立
5. トレンド予測は前日比とテクニカル状態を組み合わせて判断
6. []内の選択肢から適切なものを1つ選んで出力してください`;
    } else {
      prompt = `あなたは日本の株式市場アナリストです。ユーザーが入力したコード「${code}」について診断を行います。

この入力コードは有効な株式コードではない可能性があります。

必ず以下のフォーマットで出力してください：

【AI診断】ご入力いただいたコード「${code}」について確認しました。

申し訳ございませんが、このコードに対応する株式データを取得できませんでした。正しい4桁の株式コード（例：2269）を入力してください。

私たちのスタッフ、「AI株式診断アシスタント」のLINEアカウントを追加してください。

追加が完了しましたら、詳細診断レポートを受け取るために、正しい銘柄コードを送信してください。

重要: このフォーマットを厳密に守り、他の分析内容は含めないでください。`;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    let siliconflowResponse;
    try {
      siliconflowResponse = await fetch(
        siliconflowApiUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${selectedApiKey}`,
          },
          body: JSON.stringify({
            model: siliconflowModel,
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 1500,
            top_p: 0.7,
            top_k: 50,
            frequency_penalty: 0.5,
            stream: true,
          }),
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('Request timeout after 45 seconds');
        const responseTime = Date.now() - startTime;
        await recordUsageStats({ requests_total: 1, cache_hits: 0, api_calls: 1, errors_count: 1 });
        res.write(`data: ${JSON.stringify({ error: 'リクエストがタイムアウトしました。もう一度お試しください。' })}\n\n`);
        res.end();
        return;
      }
      throw fetchError;
    }

    console.log('SiliconFlow API response status:', siliconflowResponse.status);

    if (!siliconflowResponse.ok) {
      const errorBody = await siliconflowResponse.text();
      console.error('SiliconFlow API error response:', errorBody);
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ requests_total: 1, cache_hits: 0, api_calls: 1, errors_count: 1 });
      res.write(`data: ${JSON.stringify({ error: `SiliconFlow API error: ${siliconflowResponse.status}` })}\n\n`);
      res.end();
      return;
    }

    let fullAnalysis = '';
    const reader = siliconflowResponse.body;
    const decoder = new TextDecoder();
    let buffer = '';

    for await (const chunk of reader) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split('\n');

      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('data: ')) {
          const data = trimmedLine.slice(6).trim();

          if (data === '[DONE]') {
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              fullAnalysis += content;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            if (data.length > 0) {
              console.error('Error parsing streaming chunk. Data length:', data.length, 'First 200 chars:', data.substring(0, 200));
            }
          }
        }
      }
    }

    decoder.decode();

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

    console.log('Successfully generated streaming analysis, length:', fullAnalysis.length);

    if (fullAnalysis.trim().length > 0) {
      await saveDiagnosisToCache(code, stockData, fullAnalysis, 'qwen2.5-7b-instruct');
    } else {
      console.warn('Empty analysis result, not caching');
    }

    const responseTime = Date.now() - startTime;
    await recordUsageStats({ requests_total: 1, cache_hits: 0, api_calls: 1, errors_count: 0 });

  } catch (error) {
    console.error('Error in diagnosis function:', error);
    console.error('Error stack:', error.stack);

    const responseTime = Date.now() - startTime;
    await recordUsageStats({ requests_total: 1, cache_hits: 0, api_calls: 0, errors_count: 1 });

    if (!res.headersSent) {
      res.status(500).json({
        error: '診断中にエラーが発生しました',
        details: error.message,
        type: error.name,
      });
    } else {
      res.write(`data: ${JSON.stringify({ error: '診断中にエラーが発生しました', details: error.message })}\n\n`);
      res.end();
    }
  }
});

router.get('/stats', async (req, res) => {
  try {
    const rateLimitStatus = getRateLimitStatus();
    const { getTodayStats } = await import('../utils/sqliteStats.js');
    const todayStats = await getTodayStats();

    res.json({
      rateLimit: rateLimitStatus,
      today: todayStats,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
