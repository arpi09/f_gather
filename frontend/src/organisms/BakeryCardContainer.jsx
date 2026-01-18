import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import BakeryCard from '../molecules/BakeryCard';
import { getInstagramUrl } from '../utils/socialUtils';
import { getStatusChipConfig, shouldShowScrapeButton, formatLastScraped } from '../utils/bakeryUtils';

/**
 * Container component that adapts bakery data for the presentational BakeryCard
 * This is where business logic lives
 * @param {Object} props
 * @param {Object} props.bakery - Bakery data object
 * @param {boolean} [props.isLoading] - Whether this bakery is being scraped
 */
const BakeryCardContainer = ({ bakery, isLoading = false }) => {
  // Transform bakery data into props for the dumb component
  const statusChip = getStatusChipConfig(bakery.semlorStatus);
  
  const links = [];
  if (bakery.instagramHandle) {
    links.push({
      href: getInstagramUrl(bakery.instagramHandle),
      icon: <InstagramIcon />,
      label: 'Instagram',
    });
  }
  if (bakery.website) {
    links.push({
      href: bakery.website,
      icon: <LanguageIcon />,
      label: 'Website',
    });
  }

  return (
    <BakeryCard
      title={bakery.name}
      location={bakery.location}
      description={bakery.description}
      statusChip={statusChip}
      lastUpdated={bakery.lastScraped ? formatLastScraped(bakery.lastScraped) : null}
      lastUpdatedLabel="Last updated"
      isLoading={isLoading}
      loadingMessage="Checking for semlor..."
      links={links}
    />
  );
};

export default BakeryCardContainer;
