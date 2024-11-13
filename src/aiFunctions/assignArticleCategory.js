import { withLangfuse } from '../langfuse';
import { createBody, perplexityApi } from '../perplexity';
import { generateCategoryPrompt } from '../propmts/generateCategory';
import { createMessages } from '../utils/helpers';

export const assignArticleCategory = async (title, summary) => {
  const userPrompt = `
  Title: "${title}"
  Summary: "${summary}"
  `;

  const messages = createMessages(generateCategoryPrompt, [userPrompt]);
  const body = createBody({ messages });
  const assignCategoryQuery = () => perplexityApi.complitions(body);

  const category = await withLangfuse({
    traceName: 'assign-category',
    generationName: title,
    body,
    aiApiRequest: assignCategoryQuery,
  });

  return category;
};
