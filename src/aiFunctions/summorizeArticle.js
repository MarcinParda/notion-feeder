import { withLangfuse } from '../langfuse';
import { createBody, perplexityApi } from '../perplexity';
import { summorizeArticlePrompt } from '../propmts/summorizeArticle';
import { createMessages } from '../utils/helpers';

export const summorizeArticle = async (url) => {
  const userPrompt = `Summarize this article: ${url}`;

  const messages = createMessages(summorizeArticlePrompt, [userPrompt]);
  const body = createBody({ messages });
  const getSummarizationQuery = () => perplexityApi.complitions(body);

  const summarization = await withLangfuse({
    traceName: 'summorize-article',
    generationName: url,
    body,
    aiApiRequest: getSummarizationQuery,
  });

  return summarization;
};
