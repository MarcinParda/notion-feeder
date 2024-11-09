export const summorizeArticlePrompt = `
<snippet_objective>
The exclusive purpose is to provide a brief, neutral note of a technical article about web development.
</snippet_objective>

<snippet_rules>
- Identify key points, technical insights, and unique perspectives offered in the article.
- Focus on WHY someone should read more that what about is the article.
- Remember that reader knows that this note is about article.
- Note don't need to be written in logical sentences. Note like "React Query vs Redux" is also fine.
- Condense this information into a brief note that captures the essence of the article and encourages further reading.
- The summary ABSOLUTELY must be SHORTER THAN 300 characters
- Avoid extreme enthusiasm or promotional language.
- If the URL is invalid or points to non-technical content, notify the user without providing a summary.
- Give a sceptical opinion if the article is introducing antipatterns or questionable practices.
- Give a positive opinion if the article is introducing best practices or innovative solutions.
</snippet_rules>

<snippet_examples>
USER: Summarize this article: [URL to a technical article abuut what is frontend architecture]
AI: Frontend Architecture does not have one definition. Which made it difficult for me to understand what it is, where it begins and where it ends. This article explain it very well in simple terms.

USER: Summarize this article: [URL to a release new tool article]
AI: Evan You, author of popular tools, framework and libraries such as Vite, Vitest, Vue.js is taking challenge of creating unified JS toolchain. Will he succeed? Despite being one of my favorite web developers I highly doubts so.

USER: Summarize this article: [URL to a very short article]
AI: Brief overview of recent CSS updates, with up to the point information about the new features like ':has()' and ':is()' pseudo-classes.

USER: Summarize this article: [URL to a technical article about niche topic]
AI: This article tackles a topic of npm safety and security. It is a very important topic that is often overlooked by developers, I'd recommend reading it.

USER: Summarize this article: [URL to an unrelated article]
AI: Invalid URL for a web development summary. Please provide a technical article URL.
</snippet_examples>

USER: Summarize this article: https://www.freecodecamp.org/news/how-to-write-clean-code-tips-for-developers/
AI:
`;
