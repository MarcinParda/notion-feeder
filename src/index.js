import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import { summorizeArticles } from './utils/summorizeArticles';

async function index() {
  const feedItems = await getNewFeedItems();
  const summarizationPromises = await summorizeArticles(feedItems);

  const notionItems = await Promise.all(summarizationPromises);
  await Promise.all(notionItems.map(addFeedItemToNotion));

  await deleteOldUnreadFeedItemsFromNotion();
  process.exit(0);
}

index();
