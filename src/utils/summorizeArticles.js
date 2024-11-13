import { assignArticleCategory } from '../aiFunctions/assignArticleCategory';
import { summorizeArticle } from '../aiFunctions/summorizeArticle';
import { youtubeLinks } from '../conts/youtubeLinks';
import { removeExtraSpaces } from './helpers';

export async function summorizeArticles(feedItems) {
  return feedItems.map(async (item) => {
    let summary = '';
    if (youtubeLinks.some((ytlink) => item.link.includes(ytlink))) {
      summary = `[Video] - ${item.title}`;
    } else {
      summary = await summorizeArticle(item.link);
    }
    const category = await assignArticleCategory(item.title, summary);

    return {
      title: removeExtraSpaces(item.title),
      link: removeExtraSpaces(item.link),
      summary,
      category,
    };
  });
}
