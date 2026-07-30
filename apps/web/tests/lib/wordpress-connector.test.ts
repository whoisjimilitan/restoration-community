/**
 * WordPress Connector Tests
 *
 * Tests for WordPress RSS feed fetching, parsing, and alphabetical sequencing.
 */

import { fetchWordPressPost, WordPressPost } from "@/lib/wordpress-connector";

// Mock prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    processedSource: {
      findMany: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

describe("WordPress Connector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WordPressPost interface", () => {
    it("should have all required fields", () => {
      const post: WordPressPost = {
        id: "123",
        title: "Test Post",
        content: "Test content",
        url: "https://example.com/post",
        date: new Date(),
        excerpt: "Test excerpt",
      };

      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("url");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("excerpt");
    });
  });

  describe("fetchWordPressPost", () => {
    it("should fetch and return a WordPressPost with all fields", async () => {
      // Mock the fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Test Post Title]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/test-post/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[This is test content]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      // Mock ProcessedSource to return no processed posts
      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([]);

      const post = await fetchWordPressPost("test-user");

      expect(post).not.toBeNull();
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("url");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("excerpt");
      expect(post?.title).toBe("Test Post Title");
    });

    it("should return null when network fetch fails", async () => {
      // Mock fetch to throw error
      global.fetch = jest.fn(() => Promise.reject(new Error("Network error"))) as jest.Mock;

      const post = await fetchWordPressPost("test-user");

      expect(post).toBeNull();
    });

    it("should return null when feed returns error status", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
        })
      ) as jest.Mock;

      const post = await fetchWordPressPost("test-user");

      expect(post).toBeNull();
    });

    it("should return posts with valid WordPress URLs", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post A]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-a/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content A]]></description>
                  </item>
                  <item>
                    <title><![CDATA[Post B]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-b/</link>
                    <pubDate>Mon, 29 Jul 2024 11:00:00 GMT</pubDate>
                    <description><![CDATA[Content B]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([]);

      const post = await fetchWordPressPost("test-user");

      expect(post).not.toBeNull();
      expect(post?.url).toContain("watchedtbjoshua.wordpress.com");
    });

    it("should sort posts alphabetically by title", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Zebra Post]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/zebra/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Z Content]]></description>
                  </item>
                  <item>
                    <title><![CDATA[Apple Post]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/apple/</link>
                    <pubDate>Mon, 29 Jul 2024 11:00:00 GMT</pubDate>
                    <description><![CDATA[A Content]]></description>
                  </item>
                  <item>
                    <title><![CDATA[Banana Post]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/banana/</link>
                    <pubDate>Mon, 29 Jul 2024 12:00:00 GMT</pubDate>
                    <description><![CDATA[B Content]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      // No processed posts, should return first alphabetically (Apple)
      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([]);

      const post = await fetchWordPressPost("test-user");

      expect(post?.title).toBe("Apple Post");
    });

    it("should skip already processed posts and return next unprocessed", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post A]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-a/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content A]]></description>
                  </item>
                  <item>
                    <title><![CDATA[Post B]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-b/</link>
                    <pubDate>Mon, 29 Jul 2024 11:00:00 GMT</pubDate>
                    <description><![CDATA[Content B]]></description>
                  </item>
                  <item>
                    <title><![CDATA[Post C]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-c/</link>
                    <pubDate>Mon, 29 Jul 2024 12:00:00 GMT</pubDate>
                    <description><![CDATA[Content C]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      // First post already processed
      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([
        {
          sourceKey: "https://watchedtbjoshua.wordpress.com/post-a/",
          sourceTitle: "Post A",
          sequence: 1,
          processed: true,
          processedAt: new Date(),
        },
      ]);

      const post = await fetchWordPressPost("test-user");

      // Should return second post (Post B)
      expect(post?.title).toBe("Post B");
    });

    it("should cycle back to first post when all are processed", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post A]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-a/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content A]]></description>
                  </item>
                  <item>
                    <title><![CDATA[Post B]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-b/</link>
                    <pubDate>Mon, 29 Jul 2024 11:00:00 GMT</pubDate>
                    <description><![CDATA[Content B]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      // Both posts already processed
      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([
        {
          sourceKey: "https://watchedtbjoshua.wordpress.com/post-a/",
          sourceTitle: "Post A",
          sequence: 1,
          processed: true,
          processedAt: new Date(),
        },
        {
          sourceKey: "https://watchedtbjoshua.wordpress.com/post-b/",
          sourceTitle: "Post B",
          sequence: 2,
          processed: true,
          processedAt: new Date(),
        },
      ]);

      const post = await fetchWordPressPost("test-user");

      // Should cycle back to first (Post A)
      expect(post?.title).toBe("Post A");
    });

    it("should handle getNext=false by returning first post regardless", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post A]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-a/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content A]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      const post = await fetchWordPressPost("test-user", false);

      expect(post?.title).toBe("Post A");
    });

    it("should extract excerpt from content (truncated to 200 chars)", async () => {
      const longContent =
        "A".repeat(250) + " This should be truncated"; // 250+ chars

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Test Post]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/test/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[${longContent}]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([]);

      const post = await fetchWordPressPost("test-user");

      expect(post?.excerpt.length).toBeLessThanOrEqual(203); // 200 + "..."
      expect(post?.excerpt).toContain("...");
    });

    it("should parse CDATA sections correctly", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post with <html> tags]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/test/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content with <b>bold</b> text]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([]);

      const post = await fetchWordPressPost("test-user");

      expect(post?.title).toBe("Post with <html> tags");
      expect(post?.content).toContain("<b>bold</b>");
    });
  });

  describe("ProcessedSource integration", () => {
    it("should query ProcessedSource with correct userId", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([]);

      await fetchWordPressPost("specific-user-id");

      expect(prisma.processedSource.findMany).toHaveBeenCalledWith({
        where: {
          userId: "specific-user-id",
          sourceType: "wordpress",
        },
        orderBy: {
          sequence: "asc",
        },
      });
    });

    it("should track sequence number from ProcessedSource", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post 1]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-1/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content 1]]></description>
                  </item>
                  <item>
                    <title><![CDATA[Post 2]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post-2/</link>
                    <pubDate>Mon, 29 Jul 2024 11:00:00 GMT</pubDate>
                    <description><![CDATA[Content 2]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      (prisma.processedSource.findMany as jest.Mock).mockResolvedValue([
        {
          sourceKey: "https://watchedtbjoshua.wordpress.com/post-1/",
          sourceTitle: "Post 1",
          sequence: 1,
          processed: true,
          processedAt: new Date(),
        },
      ]);

      const post = await fetchWordPressPost("test-user");

      // Should return Post 2 (next after sequence 1)
      expect(post?.title).toBe("Post 2");
    });
  });

  describe("Error handling", () => {
    it("should handle malformed XML gracefully", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve("This is not valid XML"),
        })
      ) as jest.Mock;

      const post = await fetchWordPressPost("test-user");

      // Should not crash, but return null (no valid posts)
      expect(post).toBeNull();
    });

    it("should handle missing feed gracefully", async () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("fetch failed"))
      ) as jest.Mock;

      const post = await fetchWordPressPost("test-user");

      expect(post).toBeNull();
    });

    it("should handle ProcessedSource query errors gracefully", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () =>
            Promise.resolve(`
              <rss version="2.0">
                <channel>
                  <item>
                    <title><![CDATA[Post]]></title>
                    <link>https://watchedtbjoshua.wordpress.com/post/</link>
                    <pubDate>Mon, 29 Jul 2024 10:00:00 GMT</pubDate>
                    <description><![CDATA[Content]]></description>
                  </item>
                </channel>
              </rss>
            `),
        })
      ) as jest.Mock;

      (prisma.processedSource.findMany as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      const post = await fetchWordPressPost("test-user");

      // Should return first post anyway (fallback)
      expect(post?.title).toBe("Post");
    });
  });
});
