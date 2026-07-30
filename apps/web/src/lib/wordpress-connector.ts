/**
 * WordPress Connector
 *
 * Fetches posts from a WordPress RSS feed, parses them,
 * and tracks processing state using the ProcessedSource table.
 * Posts are sorted alphabetically and sequenced for next-post lookup.
 */

import { prisma } from "./prisma";

/**
 * Represents a post fetched from WordPress
 */
export interface WordPressPost {
  id: string; // Post ID or title
  title: string; // Post title
  content: string; // Post content/excerpt
  url: string; // Full post URL
  date: Date; // Publication date
  excerpt: string; // Post excerpt
}

/**
 * Raw item from WordPress RSS feed
 */
interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

/**
 * Log with [WORDPRESS] prefix for debugging
 */
function wpLog(message: string, data?: unknown) {
  if (data) {
    console.log(`[WORDPRESS] ${message}`, data);
  } else {
    console.log(`[WORDPRESS] ${message}`);
  }
}

/**
 * Fetch and parse RSS feed from WordPress blog
 * Returns array of RSSItems sorted alphabetically by title
 */
async function fetchAndParseRSSFeed(): Promise<RSSItem[]> {
  const feedUrl = "https://watchedtbjoshua.wordpress.com/feed/";

  wpLog(`Fetching feed from ${feedUrl}`);

  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RestorativeCommunity/1.0)",
      },
    });

    if (!response.ok) {
      wpLog(`Feed fetch failed: ${response.status} ${response.statusText}`);
      return [];
    }

    const xmlText = await response.text();
    wpLog(`Feed received, parsing XML (${xmlText.length} chars)`);

    // Parse RSS items using regex (simple, reliable for RSS/Atom)
    const items: RSSItem[] = [];

    // Match <item>...</item> blocks
    const itemPattern = /<item>([\s\S]*?)<\/item>/g;
    let itemMatch;

    while ((itemMatch = itemPattern.exec(xmlText)) !== null) {
      const itemXml = itemMatch[1];

      // Extract title
      const titleMatch = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/);
      const title = titleMatch
        ? titleMatch[1].trim()
        : itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() || "";

      if (!title) continue; // Skip items without title

      // Extract link
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
      const link = linkMatch ? linkMatch[1].trim() : "";

      if (!link) continue; // Skip items without link

      // Extract pubDate
      const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();

      // Extract description (content)
      const descMatch = itemXml.match(
        /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/
      );
      const description = descMatch
        ? descMatch[1].trim()
        : itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1]?.trim() || "";

      items.push({
        title,
        link,
        pubDate,
        description,
      });
    }

    wpLog(`Parsed ${items.length} items from feed`);

    // Sort alphabetically by title
    items.sort((a, b) => a.title.localeCompare(b.title));

    return items;
  } catch (error) {
    wpLog(`Error fetching feed:`, error);
    return [];
  }
}

/**
 * Query ProcessedSource to find which posts have been processed
 * Returns the next unprocessed post in alphabetical order
 */
async function getNextUnprocessedPost(
  userId: string,
  posts: RSSItem[]
): Promise<RSSItem | null> {
  wpLog(
    `Looking for next unprocessed post (${posts.length} total posts)`
  );

  try {
    // Get all processed posts for this user, ordered by sequence
    const processed = await prisma.processedSource.findMany({
      where: {
        userId,
        sourceType: "wordpress",
      },
      orderBy: {
        sequence: "asc",
      },
    });

    wpLog(`Found ${processed.length} processed posts for user`);

    // If nothing processed yet, return first post
    if (processed.length === 0) {
      wpLog("No processed posts yet, returning first post");
      return posts[0] || null;
    }

    // Find next unprocessed post
    const processedKeys = new Set(processed.map((p) => p.sourceKey));
    const unprocessedPosts = posts.filter((post) => !processedKeys.has(post.link));

    if (unprocessedPosts.length === 0) {
      wpLog("All posts processed, cycling back to first");
      // All processed; start over from first
      return posts[0] || null;
    }

    wpLog(`Found ${unprocessedPosts.length} unprocessed posts, returning first`);
    return unprocessedPosts[0];
  } catch (error) {
    wpLog(`Error querying ProcessedSource:`, error);
    return posts[0] || null;
  }
}

/**
 * Main function: Fetch next unprocessed WordPress post
 *
 * @param userId - User ID for tracking processed posts
 * @param getNext - If true, return next unprocessed post; if false, return any available post
 * @returns WordPressPost object or null if no posts available
 */
export async function fetchWordPressPost(
  userId: string,
  getNext: boolean = true
): Promise<WordPressPost | null> {
  wpLog(`Fetching WordPress post for user ${userId} (getNext=${getNext})`);

  // Fetch and parse feed
  const posts = await fetchAndParseRSSFeed();

  if (posts.length === 0) {
    wpLog("No posts available from feed");
    return null;
  }

  // Get next unprocessed post
  let selectedPost: RSSItem | null = null;

  if (getNext) {
    selectedPost = await getNextUnprocessedPost(userId, posts);
  } else {
    // Just return first post
    selectedPost = posts[0];
  }

  if (!selectedPost) {
    wpLog("No post selected");
    return null;
  }

  wpLog(`Selected post: "${selectedPost.title}"`);

  // Convert to WordPressPost
  const post: WordPressPost = {
    id: selectedPost.link, // Use URL as unique ID
    title: selectedPost.title,
    content: selectedPost.description,
    url: selectedPost.link,
    date: new Date(selectedPost.pubDate),
    excerpt:
      selectedPost.description.substring(0, 200) +
      (selectedPost.description.length > 200 ? "..." : ""),
  };

  return post;
}

/**
 * Mark a post as processed and update its sequence number
 *
 * @param userId - User ID
 * @param postUrl - Post URL (sourceKey)
 * @param postTitle - Post title
 * @param sequence - Sequence number for alphabetical ordering
 */
export async function markPostAsProcessed(
  userId: string,
  postUrl: string,
  postTitle: string,
  sequence: number
): Promise<void> {
  wpLog(`Marking post "${postTitle}" as processed (sequence ${sequence})`);

  try {
    await prisma.processedSource.upsert({
      where: {
        sourceType_sourceKey_userId: {
          sourceType: "wordpress",
          sourceKey: postUrl,
          userId,
        },
      },
      create: {
        sourceType: "wordpress",
        sourceKey: postUrl,
        sourceTitle: postTitle,
        sequence,
        processed: true,
        processedAt: new Date(),
        userId,
      },
      update: {
        processed: true,
        processedAt: new Date(),
        sequence,
      },
    });

    wpLog(`Post marked as processed`);
  } catch (error) {
    wpLog(`Error marking post as processed:`, error);
    throw error;
  }
}
