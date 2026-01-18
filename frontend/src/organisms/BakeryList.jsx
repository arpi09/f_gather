import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import BakeryCard from '../molecules/BakeryCard';

/**
 * Presentational component for displaying a list of bakeries
 * @param {Object} props
 * @param {Array} props.bakeries - Array of bakery objects
 * @param {string} [props.emptyMessage] - Message to display when no bakeries are found
 * @param {Function} [props.onScrape] - Callback function to scrape a bakery
 * @param {string} [props.scrapingBakeryId] - ID of bakery currently being scraped
 */
const BakeryList = ({ bakeries, emptyMessage = 'No bakeries found. Check back later!', onScrape, scrapingBakeryId }) => {
  if (!bakeries || bakeries.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {bakeries.map((bakery) => (
        <Grid item xs={12} sm={6} md={4} key={bakery._id}>
          <BakeryCard 
            bakery={bakery} 
            onScrape={onScrape}
            isScraping={scrapingBakeryId === bakery._id}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BakeryList;
