import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import { removeExtraSpaces } from './helpers';
import { summorizeArticle } from './aiFunctions/summorizeArticle';

const youtubeLinks = ['youtube.com', 'youtu.be'];

async function index() {
  const feedItems = await getNewFeedItems();
  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];

    let aiSummary = '';
    if (youtubeLinks.some((ytlink) => item.link.includes(ytlink))) {
      aiSummary = `[Video] - ${item.title}`;
    } else {
      aiSummary = await summorizeArticle(item.link);
    }

    const notionItem = {
      title: removeExtraSpaces(item.title),
      link: removeExtraSpaces(item.link),
      aiSummary,
    };
    await addFeedItemToNotion(notionItem);
  }

  await deleteOldUnreadFeedItemsFromNotion();
  process.exit(0);
}

index();
