import * as cheerio from 'cheerio';
import axios from 'axios';

/**
 * Service for scraping bakery information from websites and Instagram
 */

/**
 * Scrapes a website for bakery information and semlor mentions
 * @param {string} url - Website URL to scrape
 * @returns {Promise<Object>} - Scraped data
 */
export const scrapeWebsite = async (url) => {
  try {
    if (!url) {
      return { success: false, error: 'No URL provided' };
    }

    // Fetch the website
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000, // 10 second timeout
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract page text
    const pageText = $('body').text().toLowerCase();
    
    // Search for semlor mentions
    const semlorKeywords = ['semlor', 'semla', 'semlans dag', 'fettisdagen'];
    const hasSemlorMention = semlorKeywords.some(keyword => 
      pageText.includes(keyword.toLowerCase())
    );

    // Try to extract bakery name from title or h1
    let bakeryName = $('title').text().trim();
    if (!bakeryName || bakeryName.length > 100) {
      bakeryName = $('h1').first().text().trim();
    }

    // Try to extract description from meta tags
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || 
                       '';

    return {
      success: true,
      bakeryName: bakeryName || '',
      description: description.substring(0, 500), // Limit description length
      hasSemlorMention,
      semlorStatus: hasSemlorMention ? 'confirmed' : 'unknown',
      scrapedAt: new Date(),
    };

  } catch (error) {
    console.error('Website scraping error:', error.message);
    return {
      success: false,
      error: error.message,
      semlorStatus: 'unknown',
    };
  }
};

/**
 * Attempts to scrape Instagram profile information
 * Note: Instagram has strict anti-scraping measures. This is a basic implementation.
 * For production, consider using Instagram's official API or a service like Apify.
 * 
 * @param {string} instagramHandle - Instagram handle (without @)
 * @returns {Promise<Object>} - Scraped data
 */
export const scrapeInstagram = async (instagramHandle) => {
  try {
    if (!instagramHandle) {
      return { success: false, error: 'No Instagram handle provided' };
    }

    // Remove @ if present
    const cleanHandle = instagramHandle.replace('@', '').trim();
    const url = `https://www.instagram.com/${cleanHandle}/`;

    // Note: Instagram requires authentication and has anti-scraping measures
    // This is a basic attempt that may not work reliably
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const html = response.data;
    
    // Try to find semlor mentions in the page content
    const semlorKeywords = ['semlor', 'semla', 'fettisdagen'];
    const hasSemlorMention = semlorKeywords.some(keyword => 
      html.toLowerCase().includes(keyword)
    );

    // Try to extract bio/description
    const $ = cheerio.load(html);
    const metaDescription = $('meta[property="og:description"]').attr('content') || '';

    return {
      success: true,
      instagramUrl: url,
      bio: metaDescription,
      hasSemlorMention,
      semlorStatus: hasSemlorMention ? 'confirmed' : 'unknown',
      note: 'Instagram scraping is limited. Consider using Instagram API for reliable data.',
      scrapedAt: new Date(),
    };

  } catch (error) {
    console.error('Instagram scraping error:', error.message);
    return {
      success: false,
      error: error.message,
      note: 'Instagram blocks most scraping attempts. Consider manual verification or using Instagram API.',
      semlorStatus: 'unknown',
    };
  }
};

/**
 * Scrapes all available sources for a bakery
 * @param {Object} bakery - Bakery object with website and instagramHandle
 * @returns {Promise<Object>} - Combined scraped data
 */
export const scrapeBakery = async (bakery) => {
  const results = {
    bakeryId: bakery._id,
    bakeryName: bakery.name,
    scrapedAt: new Date(),
    website: null,
    instagram: null,
    combined: {
      hasSemlor: false,
      semlorStatus: 'unknown',
      description: bakery.description || '',
    },
  };

  // Scrape website if available
  if (bakery.website) {
    results.website = await scrapeWebsite(bakery.website);
    
    if (results.website.success) {
      if (results.website.hasSemlorMention) {
        results.combined.hasSemlor = true;
        results.combined.semlorStatus = 'confirmed';
      }
      
      // Update description if we got a better one
      if (results.website.description && results.website.description.length > results.combined.description.length) {
        results.combined.description = results.website.description;
      }
    }
  }

  // Scrape Instagram if available
  if (bakery.instagramHandle) {
    results.instagram = await scrapeInstagram(bakery.instagramHandle);
    
    if (results.instagram.success && results.instagram.hasSemlorMention) {
      results.combined.hasSemlor = true;
      results.combined.semlorStatus = 'confirmed';
    }
  }

  // If no semlor mentions found, check if we have enough data to say "not_available"
  if (!results.combined.hasSemlor && (results.website?.success || results.instagram?.success)) {
    // We successfully scraped but found no semlor mentions
    // Keep as 'unknown' since absence doesn't mean they don't have it
    results.combined.semlorStatus = 'unknown';
  }

  return results;
};
