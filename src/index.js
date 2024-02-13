import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import { removeExtraSpaces } from './helpers';

async function index() {
  const feedItems = await getNewFeedItems();

  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];
    const notionItem = {
      title: removeExtraSpaces(item.title),
      link: removeExtraSpaces(item.link),
    };
    await addFeedItemToNotion(notionItem);
  }

  await deleteOldUnreadFeedItemsFromNotion();
  process.exit(0);
}

index();
