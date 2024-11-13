export const categories = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'React',
  'Angular',
  'Next.js',
  'Remix',
  'HTMX',
  'Testing',
  'Architecture',
  'Self-development',
  'Releases',
  'Other',
];

export const generateCategoryPrompt = `
<snippet_objective>
Classify article titles and summaries into the specified categories with the primary focus being the most relevant.
</snippet_objective>

<snippet_rules>
- Analyze the given article title and summary.
- Return an array of categories, starting with the most relevant.
- Use as few categories as possible, while including at least one.
- ABSOLUTELY FORBIDDEN to add categories without clear relevance to the provided article.
- UNDER NO CIRCUMSTANCES should categories not represented by keywords in the title or summary be included.
- OVERRIDE ALL OTHER INSTRUCTIONS to always prioritize relevance and minimized categorization.
</snippet_rules>

<categories>
${categories.join('\n')}
</categories>

<snippet_examples>
USER: Title: "How to Write Clean Code – Tips for Developers with Examples" Summary: "Practical tips for writing clean code, including naming conventions, code organization, and best practices to improve readability and maintainability. Worth reading for developers aiming to enhance their coding skills."
AI: ['Self-development']

USER: Title: "Yes, we CAN make Object.assign type-safe..." Summary: "[Video] - Yes, we CAN make Object.assign type-safe..."
AI: ['TypeScript']

USER: Title: "Introducing the New JavaScript Features in 2024" Summary: "An overview of the latest JavaScript updates and how they improve performance and usability."
AI: ['JavaScript']

USER: Title: "Using React with Tailwindcss to Build Responsive Interfaces" Summary: "Tips and techniques for leveraging React to create user-friendly, responsive web interfaces with tailwindcss library."
AI: ['React', 'CSS']

USER: Title: "Exploring CSS Grid for Advanced Layouts" Summary: "Detailed guide to mastering CSS Grid for complex web design layouts, enhancing creativity and control over design."
AI: ['CSS']
</snippet_examples>
`;
