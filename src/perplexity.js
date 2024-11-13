import dotenv from 'dotenv';

dotenv.config();
const { PERPLEXITY_API_KEY } = process.env;

export const createBody = ({
  model = 'llama-3.1-sonar-large-128k-chat',
  messages = [],
  max_tokens = 256,
  temperature = 0.2,
  top_p = 0.9,
  return_citations = true,
  search_domain_filter = ['perplexity.ai'],
  return_images = false,
  return_related_questions = false,
  search_recency_filter = 'month',
  top_k = 0,
  stream = false,
  presence_penalty = 0,
  frequency_penalty = 1,
}) => ({
  model,
  messages,
  max_tokens,
  temperature,
  top_p,
  return_citations,
  search_domain_filter,
  return_images,
  return_related_questions,
  search_recency_filter,
  top_k,
  stream,
  presence_penalty,
  frequency_penalty,
});

const createOptions = ({ body, perplexityApiKey = PERPLEXITY_API_KEY }) => ({
  method: 'POST',
  headers: {
    Authorization: `Bearer ${perplexityApiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const complitions = async (body) => {
  const options = createOptions({ body });
  try {
    const response = await fetch(
      'https://api.perplexity.ai/chat/completions',
      options
    );
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    throw new Error(err);
  }
};

export const perplexityApi = {
  complitions,
};
