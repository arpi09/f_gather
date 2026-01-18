import express from 'express';
import Bakery from '../models/Bakery.js';
import { scrapeBakery } from '../services/scrapingService.js';

const router = express.Router();

/**
 * POST /api/scraping/bakery/:id
 * Scrape a single bakery and update its information
 */
router.post('/bakery/:id', async (req, res) => {
  try {
    const bakery = await Bakery.findById(req.params.id);
    
    if (!bakery) {
      return res.status(404).json({ error: 'Bakery not found' });
    }

    // Perform scraping
    const scrapedData = await scrapeBakery(bakery);

    // Update bakery with scraped data
    bakery.hasSemlor = scrapedData.combined.hasSemlor;
    bakery.semlorStatus = scrapedData.combined.semlorStatus;
    bakery.lastScraped = new Date();
    bakery.scrapedData = scrapedData;

    // Update description if we got a better one
    if (scrapedData.combined.description && scrapedData.combined.description.length > (bakery.description || '').length) {
      bakery.description = scrapedData.combined.description;
    }

    await bakery.save();

    res.json({
      message: 'Bakery scraped successfully',
      bakery,
      scrapingResults: scrapedData,
    });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/scraping/all
 * Scrape all bakeries (be careful with rate limiting)
 */
router.post('/all', async (req, res) => {
  try {
    const bakeries = await Bakery.find();
    
    if (bakeries.length === 0) {
      return res.json({ message: 'No bakeries to scrape' });
    }

    const results = [];
    
    // Scrape each bakery with a delay to avoid rate limiting
    for (const bakery of bakeries) {
      try {
        const scrapedData = await scrapeBakery(bakery);
        
        bakery.hasSemlor = scrapedData.combined.hasSemlor;
        bakery.semlorStatus = scrapedData.combined.semlorStatus;
        bakery.lastScraped = new Date();
        bakery.scrapedData = scrapedData;

        if (scrapedData.combined.description && scrapedData.combined.description.length > (bakery.description || '').length) {
          bakery.description = scrapedData.combined.description;
        }

        await bakery.save();
        
        results.push({
          bakeryId: bakery._id,
          bakeryName: bakery.name,
          success: true,
          semlorStatus: bakery.semlorStatus,
        });

        // Add delay between requests to avoid rate limiting (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`Error scraping bakery ${bakery.name}:`, error);
        results.push({
          bakeryId: bakery._id,
          bakeryName: bakery.name,
          success: false,
          error: error.message,
        });
      }
    }

    res.json({
      message: `Scraped ${bakeries.length} bakeries`,
      results,
    });

  } catch (error) {
    console.error('Bulk scraping error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
