import Parser from 'rss-parser';
import dotenv from 'dotenv';
import timeDifference, { removeExtraSpaces } from './helpers';
import {
  getFeedUrlsFromNotion,
  getLastWeekFeedItemsFromNotion,
} from './notion';

dotenv.config();

const { RUN_FREQUENCY } = process.env;

async function getNewFeedItemsFrom(feedUrl) {
  const parser = new Parser();
  let rss;
  try {
    rss = await parser.parseURL(feedUrl);
  } catch (error) {
    console.error(error);
    return [];
  }
  const currentTime = new Date().getTime() / 1000;

  // Filter out items that fall in the run frequency range
  const filteredByRunFrequency = rss.items.filter((item) => {
    const blogPublishedTime = new Date(item.pubDate).getTime() / 1000;
    const { diffInSeconds } = timeDifference(currentTime, blogPublishedTime);
    return diffInSeconds < Number(RUN_FREQUENCY);
  });

  const lastWeekFeedItemsFromNotion = await getLastWeekFeedItemsFromNotion();

  // Filter out items that are already in the database
  const filteredByLastWeekFeedItems = filteredByRunFrequency.filter(
    (item) =>
      !lastWeekFeedItemsFromNotion.some(
        (notionItem) =>
          removeExtraSpaces(notionItem.link) === removeExtraSpaces(item.link)
      )
  );

  return filteredByLastWeekFeedItems;
}

export default async function getNewFeedItems() {
  let allNewFeedItems = [];

  const feeds = await getFeedUrlsFromNotion();

  for (let i = 0; i < feeds.length; i++) {
    const { feedUrl } = feeds[i];
    const feedItems = await getNewFeedItemsFrom(feedUrl);
    allNewFeedItems = [...allNewFeedItems, ...feedItems];
  }

  // sort feed items by published date
  allNewFeedItems.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));

  return allNewFeedItems;
}
