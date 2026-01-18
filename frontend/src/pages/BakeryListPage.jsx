import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import BakeryList from '../organisms/BakeryList';
import { bakeryService } from '../services/bakeryService';

const BakeryListPage = () => {
  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <BakeryList bakeries={bakeries} />
      )}
    </Container>
  );
};

export default BakeryListPage;
