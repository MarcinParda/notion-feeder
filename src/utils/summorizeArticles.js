import { summorizeArticle } from '../aiFunctions/summorizeArticle';
import { youtubeLinks } from '../conts/youtubeLinks';
import { removeExtraSpaces } from './helpers';

export async function summorizeArticles(feedItems) {
  return feedItems.map(async (item) => {
    let aiSummary = '';
    if (youtubeLinks.some((ytlink) => item.link.includes(ytlink))) {
      aiSummary = `[Video] - ${item.title}`;
    } else {
      aiSummary = await summorizeArticle(item.link);
    }

    return {
      title: removeExtraSpaces(item.title),
      link: removeExtraSpaces(item.link),
      aiSummary,
    };
  });
}
