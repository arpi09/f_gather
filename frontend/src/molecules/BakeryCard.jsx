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
  CircularProgress,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

/**
 * Pure presentational component for displaying entity cards
 * No business logic, no hardcoded data - completely reusable
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} [props.location] - Location text
 * @param {string} [props.description] - Description text
 * @param {Object} props.statusChip - Status chip configuration
 * @param {string} props.statusChip.label - Chip label text
 * @param {string} props.statusChip.color - Chip color
 * @param {string} props.statusChip.variant - Chip variant
 * @param {boolean} [props.statusChip.showIcon] - Whether to show help icon
 * @param {string} [props.lastUpdated] - Last updated text
 * @param {string} [props.lastUpdatedLabel] - Label for last updated
 * @param {boolean} [props.isLoading] - Whether card is in loading state
 * @param {string} [props.loadingMessage] - Message to show when loading
 * @param {Array} [props.links] - Array of link objects {href, icon, label}
 */
const BakeryCard = ({ 
  title,
  location,
  description,
  statusChip,
  lastUpdated,
  lastUpdatedLabel = 'Last updated',
  isLoading = false,
  loadingMessage = 'Loading...',
  links = [],
}) => {

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
            {title}
          </Typography>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Chip
              label={statusChip.label}
              color={statusChip.color}
              size="small"
              variant={statusChip.variant}
              icon={statusChip.showIcon ? <HelpOutlineIcon fontSize="small" /> : undefined}
              sx={{ fontWeight: 'bold' }}
            />
          )}
        </Box>

        {location && (
          <Box display="flex" alignItems="center" gap={0.5} mb={1}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Box>
        )}

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            {description}
          </Typography>
        )}

        {isLoading && (
          <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
            {loadingMessage}
          </Typography>
        )}

        {lastUpdated && !isLoading && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            {lastUpdatedLabel}: {lastUpdated}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        {links.map((link, index) => (
          <IconButton
            key={index}
            component={Link}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            aria-label={link.label}
          >
            {link.icon}
          </IconButton>
        ))}
      </CardActions>
    </Card>
  );
};

export default BakeryCard;
