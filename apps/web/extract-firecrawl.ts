import FirecrawlApp from 'firecrawl';

async function extractEpisode() {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  console.log('API Key present:', !!apiKey);
  
  if (!apiKey) {
    console.error('FIRECRAWL_API_KEY not set');
    process.exit(1);
  }

  const fc = new FirecrawlApp({ apiKey });
  const url = 'https://podcasters.spotify.com/pod/show/themanondmount/episodes/A-Contented-Life-e3jdnm';

  console.log('Scraping episode with Firecrawl...\n');
  
  try {
    const result = await fc.scrapeUrl(url, {
      formats: ['markdown'],
    });

    if (!result.success) {
      console.error('Scrape failed:', result.error);
      process.exit(1);
    }

    console.log('✓ Extraction successful\n');
    console.log(result.markdown);

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

extractEpisode();
