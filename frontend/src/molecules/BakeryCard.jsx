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
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
 * @param {string} [props.bakery.instagramHandle] - Instagram handle
 * @param {string} [props.bakery.website] - Website URL
 * @param {string} [props.hasSemlorLabel] - Label for "has semlor" state
 * @param {string} [props.noSemlorLabel] - Label for "no semlor" state
 */
const BakeryCard = ({ 
  bakery, 
  hasSemlorLabel = 'Has Semlor',
  noSemlorLabel = 'No Semlor'
}) => {
  const instagramUrl = bakery.instagramHandle ? getInstagramUrl(bakery.instagramHandle) : null;

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
          {bakery.hasSemlor && (
            <Chip
              label={hasSemlorLabel}
              color="primary"
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          )}
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

        {!bakery.hasSemlor && (
          <Chip
            label={noSemlorLabel}
            color="default"
            size="small"
            variant="outlined"
            sx={{ mt: 1 }}
          />
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
