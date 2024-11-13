import dotenv from 'dotenv';
import { Langfuse } from 'langfuse';
import { createPromptFromMessages } from './utils/helpers';

dotenv.config();

const { LANGFUSE_SECRET_KEY, LANGFUSE_PUBLIC_KEY, LANGFUSE_HOST } = process.env;

export const langfuse = new Langfuse({
  secretKey: LANGFUSE_SECRET_KEY,
  publicKey: LANGFUSE_PUBLIC_KEY,
  host: LANGFUSE_HOST,
});

export const withLangfuse = async ({
  traceName,
  generationName,
  body,
  aiApiRequest,
}) => {
  const trace = langfuse.trace({
    name: traceName,
    userId: 'notion-feeder',
  });

  const generation = trace.generation({
    name: generationName,
    model: body.model,
    modelParameters: {
      temperature: body.temperature,
      maxTokens: body.max_tokens,
    },
    input: {
      prompt: createPromptFromMessages(body.messages),
    },
  });

  const result = await aiApiRequest();

  generation.end({
    output: result,
  });

  return result;
};
