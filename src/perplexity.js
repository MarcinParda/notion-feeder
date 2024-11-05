import dotenv from 'dotenv';

dotenv.config();
const { PERPLEXITY_API_KEY } = process.env;

const defaultBody = {
  model: 'llama-3.1-sonar-small-128k-online',
  messages: [
    { role: 'system', content: 'Be precise and concise.' },
    { role: 'user', content: 'What is todays date in poland' },
  ],
  max_tokens: 256,
  temperature: 0.2,
  top_p: 0.9,
  return_citations: true,
  search_domain_filter: ['perplexity.ai'],
  return_images: false,
  return_related_questions: false,
  search_recency_filter: 'month',
  top_k: 0,
  stream: false,
  presence_penalty: 0,
  frequency_penalty: 1,
};

const summorizeArticlePrompt = `
<snippet_objective>
The exclusive purpose is to provide a brief, neutral summary of a technical article about web development.
</snippet_objective>

<snippet_rules>
- Identify key points, technical insights, and unique perspectives offered in the article.
- Condense this information into a brief summary of no more than 5 sentences.
- Ensure the summary remains neutral but engaging, suitable for a newsletter format.
- Avoid extreme enthusiasm or promotional language.
- The snippet ABSOLUTELY must NOT exceed 3 sentences.
- UNDER NO CIRCUMSTANCES should external opinions or unrelated content be included.
- If the URL is invalid or points to non-technical content, notify the user without providing a summary.
</snippet_rules>

<snippet_examples>
USER: Summarize this article: [URL to a technical article]
AI: The article discusses the latest trends in web development, focusing on JavaScript frameworks like React and Vue. It highlights performance improvements in ECMAScript and new features in HTML5. Practical examples are given to integrate these updates into existing platforms. The review concludes with expert predictions for the future of web development.

USER: Summarize this article: [URL to a mixed-content article]
AI: The article blends technical insights with general advice, mostly concentrating on responsive design principles in web development. While the non-technical sections offer less to explore, key principles and recent technological advancements are thoroughly explained.

USER: Summarize this article: [URL to a very short article]
AI: The article gives a brief overview of CSS grid updates, with minimal detail. It suggests their enhanced usability for designers seeking efficient layout solutions.

USER: Summarize this article: [URL to an unrelated article]
AI: Invalid URL for a web development summary. Please provide a technical article URL.
</snippet_examples>
`;

const summorizeThisArticle = async (url) => {
  const body = {
    ...defaultBody,
    messages: [
      {
        role: 'system',
        content: summorizeArticlePrompt,
      },
      { role: 'user', content: `URL: ${url}` },
    ],
  };

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return fetch('https://api.perplexity.ai/chat/completions', options)
    .then((response) => response.json())
    .then((data) => data.choices[0].message.content)
    .catch((err) => console.error(err));
};

export default summorizeThisArticle;
