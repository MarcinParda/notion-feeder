import { langfuse } from '../langfuse';
import { createBody, createOptions, perplexityApi } from '../perplexity';
import { summorizeArticlePrompt } from '../propmts/summorizeArticle';

export const summorizeArticle = async (url) => {
  const trace = langfuse.trace({
    name: 'summarize-article',
    userId: 'notion-feeder',
    metadata: { articleUrl: url },
  });

  const userPrompt = `Summarize this article: ${url}`;

  const messages = [
    {
      role: 'system',
      content: summorizeArticlePrompt,
    },
    { role: 'user', content: userPrompt },
  ];
  const body = createBody({ messages });
  const options = createOptions({ body });

  const generation = trace.generation({
    name: 'article-summary',
    model: body.model,
    modelParameters: {
      temperature: body.temperature,
      maxTokens: body.max_tokens,
    },
    input: { prompt: `${summorizeArticlePrompt}\n${userPrompt}` },
  });

  const summarization = await perplexityApi.complitions(options);

  generation.end({
    output: summarization,
  });

  return summarization;
};

export default {};
