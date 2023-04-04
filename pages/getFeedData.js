import Parser from 'rss-parser';

export async function getFeedData() {
  const parser = new Parser();
  const feed = await parser.parseURL('https://www.essentiallysports.com/feed/');
  console.log(feed)
  return feed.items;
}
