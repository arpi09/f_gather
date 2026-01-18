import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Snackbar } from '@mui/material';
import BakeryList from '../organisms/BakeryList';
import { bakeryService } from '../services/bakeryService';
import { scrapingService } from '../services/scrapingService';

const BakeryListPage = () => {
  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrapingBakeryId, setScrapingBakeryId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    loadBakeries();
  }, []);

  const loadBakeries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bakeryService.getAll();
      setBakeries(data);
    } catch (err) {
      setError('Failed to load bakeries. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeBakery = async (bakeryId) => {
    try {
      setScrapingBakeryId(bakeryId);
      setSnackbar({ open: true, message: 'Checking for semlor...', severity: 'info' });

      const result = await scrapingService.scrapeBakery(bakeryId);
      
      // Update the bakery in the list
      setBakeries(prev => 
        prev.map(b => b._id === bakeryId ? result.bakery : b)
      );

      const status = result.bakery.semlorStatus;
      const message = status === 'confirmed' 
        ? 'Found semlor!' 
        : status === 'not_available'
        ? 'No semlor found'
        : 'Could not determine semlor availability';

      setSnackbar({ 
        open: true, 
        message, 
        severity: status === 'confirmed' ? 'success' : 'info' 
      });

    } catch (err) {
      console.error('Scraping error:', err);
      setSnackbar({ 
        open: true, 
        message: 'Failed to check for semlor. Please try again.', 
        severity: 'error' 
      });
    } finally {
      setScrapingBakeryId(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
          onScrape={handleScrapeBakery}
          scrapingBakeryId={scrapingBakeryId}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
};

export default BakeryListPage;
