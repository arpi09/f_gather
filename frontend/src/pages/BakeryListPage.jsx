import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import BakeryList from '../organisms/BakeryList';
import { bakeryService } from '../services/bakeryService';
import { scrapingService } from '../services/scrapingService';

const BakeryListPage = () => {
  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrapingBakeryIds, setScrapingBakeryIds] = useState(new Set());

  useEffect(() => {
    loadAndScrapeAll();
  }, []);

  const loadAndScrapeAll = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First, load all bakeries
      const data = await bakeryService.getAll();
      setBakeries(data);
      setLoading(false);

      // Then scrape all bakeries in parallel
      const scrapePromises = data
        .filter(bakery => bakery.website || bakery.instagramHandle)
        .map(bakery => scrapeSingleBakery(bakery._id));
      
      // Wait for all scraping to complete (but don't block UI)
      await Promise.allSettled(scrapePromises);
    } catch (err) {
      setError('Failed to load bakeries. Please try again later.');
      console.error(err);
      setLoading(false);
    }
  };

  const scrapeSingleBakery = async (bakeryId) => {
    try {
      // Add to scraping set
      setScrapingBakeryIds(prev => new Set([...prev, bakeryId]));

      const result = await scrapingService.scrapeBakery(bakeryId);
      
      // Update the bakery in the list
      setBakeries(prev => 
        prev.map(b => b._id === bakeryId ? result.bakery : b)
      );

    } catch (err) {
      console.error(`Scraping error for bakery ${bakeryId}:`, err);
    } finally {
      // Remove from scraping set
      setScrapingBakeryIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(bakeryId);
        return newSet;
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bakery Finder
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find bakeries that offer semlor
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <BakeryList 
          bakeries={bakeries}
          scrapingBakeryIds={scrapingBakeryIds}
        />
      )}
    </Container>
  );
};

export default BakeryListPage;
