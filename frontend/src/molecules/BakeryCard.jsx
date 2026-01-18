import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Link,
  IconButton,
  Button,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getInstagramUrl } from '../utils/socialUtils';

/**
 * Presentational component for displaying bakery information
 * Pure component - receives all data via props, no internal state or side effects
 * @param {Object} props
 * @param {Object} props.bakery - Bakery data object
 * @param {string} props.bakery.name - Bakery name
 * @param {string} [props.bakery.location] - Bakery location
 * @param {string} [props.bakery.description] - Bakery description
 * @param {boolean} props.bakery.hasSemlor - Whether bakery offers semlor
 * @param {string} [props.bakery.semlorStatus] - Semlor status (confirmed/unknown/not_available)
 * @param {string} [props.bakery.instagramHandle] - Instagram handle
 * @param {string} [props.bakery.website] - Website URL
 * @param {Function} [props.onScrape] - Callback when scrape button is clicked
 * @param {boolean} [props.isScrapingCallback function to trigger scraping
 */
const BakeryCard = ({ 
  bakery, 
  onScrape,
  isScraping = false,
}) => {
  const instagramUrl = bakery.instagramHandle ? getInstagramUrl(bakery.instagramHandle) : null;

  // Get status chip properties based on semlorStatus
  const getStatusChip = () => {
    const status = bakery.semlorStatus || 'unknown';
    
    switch(status) {
      case 'confirmed':
        return {
          label: 'Has Semlor ✓',
          color: 'success',
          variant: 'filled',
        };
      case 'not_available':
        return {
          label: 'No Semlor',
          color: 'error',
          variant: 'outlined',
        };
      case 'unknown':
      default:
        return {
          label: 'Semlor Status Unknown',
          color: 'default',
          variant: 'outlined',
          icon: <HelpOutlineIcon fontSize="small" />,
        };
    }
  };

  const statusChip = getStatusChip();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {bakery.name}
          </Typography>
          <Chip
            label={statusChip.label}
            color={statusChip.color}
            size="small"
            variant={statusChip.variant}
            icon={statusChip.icon}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        {bakery.location && (
          <Box display="flex" alignItems="center" gap={0.5} mb={1}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {bakery.location}
            </Typography>
          </Box>
        )}

        {bakery.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            {bakery.description}
          </Typography>
        )}

        {bakery.lastScraped && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Last updated: {new Date(bakery.lastScraped).toLocaleDateString()}
          </Typography>
        )}

        {bakery.semlorStatus === 'unknown' && (bakery.website || bakery.instagramHandle) && (
          <Box sx={{ mt: 2 }}>
            <Button
              size="small"
              startIcon={<RefreshIcon />}
              onClick={() => onScrape && onScrape(bakery._id)}
              disabled={isScraping}
              variant="outlined"
            >
              {isScraping ? 'Checking...' : 'Check for Semlor'}
            </Button>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        {instagramUrl && (
          <IconButton
            component={Link}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </IconButton>
        )}
        {bakery.website && (
          <IconButton
            component={Link}
            href={bakery.website}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            aria-label="Website"
          >
            <LanguageIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default BakeryCard;
