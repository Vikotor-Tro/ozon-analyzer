export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { card, reviews } = req.body;
  if (!card) return res.status(400).json({ error: 'card is required' });

  const prompt = [
    'You are an expert in optimizing product listings on Russian marketplaces Ozon and Wildberries.',
    'Analyze the product card and respond strictly in the format below. Each section starts with ##.',
    'Write all your responses in Russian.',
    '',
    '## SEO_SCORE',
    'A number from 0 to 100 rating the current SEO quality. Only the number.',
    '',
    '## SEO_ANALIS',
    '3-5 specific SEO problems: missing keywords, weak title, missing characteristics.',
    '',
    '## NOVYE_ZAGOLOVKI',
    '3 title variants:',
    '1. Characteristics: [title]',
    '2. Customer pain: [title]',
    '3. Uniqueness: [title]',
    '',
    '## ULUCHSHENNOE_OPISANIE',
    'A ready improved description - keyword-rich but reads naturally, 4-6 sentences.',
    '',
    '## CTR_GIPOTEZY',
    '3-4 specific CTR improvement hypotheses (photo, price, badges, promotions).',
    '',
    '## INFOGRAFIKA',
    '4-5 infographic slide ideas: what to show and what message to convey.',
    '',
    '## ANALIZ_OTZYVOV',
    reviews
      ? 'Main reasons for negative reviews, what customers praise (strengthen in description), recommendations.'
      : 'No reviews provided. Describe typical risks and customer objections for this product category.',
    '',
    '---',
    'PRODUCT CARD:',
    card,
    reviews ? '\nREVIEWS:\n' + reviews : '',
    '',
    'Respond only in the format above. No preamble.',
  ].join('\n');

  try {
    const response = await fetch(
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
        },
        body: JSON.stringify({
          modelUri: `gpt://${process.env.YANDEX_FOLDER_ID}/yandexgpt-lite`,
          completionOptions: {
            stream: false,
            temperature: 0.7,
            maxTokens: 2500,
          },
          messages: [
            { role: 'user', text: prompt }
          ],
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || JSON.stringify(data) });

    const text = data.result?.alternatives?.[0]?.message?.text || '';
    if (!text) return res.status(500).json({ error: 'Empty response from YandexGPT' });

    return res.status(200).json({ result: text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
