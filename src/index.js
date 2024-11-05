import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import { removeExtraSpaces } from './helpers';
import summorizeThisArticle from './perplexity';

const aiSummaryBlacklist = ['youtube.com', 'youtu.be'];

async function index() {
  const feedItems = await getNewFeedItems();
  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];

    let aiSummary = 'THIS LINK IS IN THE AI SUMMARY GENERATOR BLACKLIST';
    if (
      !aiSummaryBlacklist.some((blacklist) => item.link.includes(blacklist))
    ) {
      aiSummary = await summorizeThisArticle(item.link);
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
