# Web Scraping Feature

## Overview

The Bakery Finder app now includes web scraping functionality to automatically gather information from bakery websites and Instagram profiles to determine if they offer semlor.

## Features

### Semlor Status

Each bakery now has a `semlorStatus` field with three possible values:
- **confirmed** (✓): Semlor was found on their website or Instagram
- **unknown** (?): Not yet checked or unable to determine
- **not_available**: Checked but no semlor found

### How It Works

1. **Website Scraping**: Searches the bakery's website for keywords like "semlor", "semla", "fettisdagen"
2. **Instagram Scraping**: Attempts to check Instagram bio and recent posts (limited due to Instagram's anti-scraping measures)
3. **Status Updates**: Automatically updates the bakery's semlor status and description

### User Interface

- **Status Chips**: Color-coded status indicators on each bakery card
  - Green "Has Semlor ✓" for confirmed
  - Gray "Semlor Status Unknown" with help icon for unknown
  - Red outline "No Semlor" for not available

- **Check Button**: Bakeries with unknown status show a "Check for Semlor" button
- **Last Updated**: Shows when the bakery was last scraped
- **Real-time Feedback**: Snackbar notifications show scraping progress and results

## API Endpoints

### Scrape Single Bakery
```
POST /api/scraping/bakery/:id
```

Scrapes a single bakery and updates its information.

**Response:**
```json
{
  "message": "Bakery scraped successfully",
  "bakery": { ... },
  "scrapingResults": { ... }
}
```

### Scrape All Bakeries
```
POST /api/scraping/all
```

Scrapes all bakeries in the database. Includes 2-second delays between requests to avoid rate limiting.

**Warning**: This can take a while if you have many bakeries.

## Database Schema Updates

### Bakery Model

New fields added:
```javascript
{
  semlorStatus: {
    type: String,
    enum: ['confirmed', 'unknown', 'not_available'],
    default: 'unknown'
  },
  lastScraped: Date,
  scrapedData: Object  // Stores raw scraping results
}
```

## Technical Implementation

### Backend

**Dependencies:**
- `cheerio`: HTML parsing and manipulation
- `axios`: HTTP requests for fetching web pages

**Services:**
- `backend/services/scrapingService.js`: Core scraping logic
  - `scrapeWebsite()`: Scrapes website content
  - `scrapeInstagram()`: Attempts Instagram scraping
  - `scrapeBakery()`: Combines all scraping sources

**Routes:**
- `backend/routes/scraping.js`: API endpoints for scraping operations

### Frontend

**Services:**
- `frontend/src/services/scrapingService.js`: API client for scraping

**Components:**
- `BakeryCard`: Shows status chip and "Check for Semlor" button
- `BakeryList`: Passes scraping callbacks to cards
- `BakeryListPage`: Manages scraping state and UI feedback

## Usage

### From UI

1. Navigate to the bakery list page
2. Find a bakery with "Semlor Status Unknown"
3. Click "Check for Semlor" button
4. Wait for the scraping to complete
5. Status will update automatically

### From API

```bash
# Scrape a single bakery
curl -X POST http://localhost:5000/api/scraping/bakery/{bakeryId}

# Scrape all bakeries
curl -X POST http://localhost:5000/api/scraping/all
```

## Limitations

### Instagram Scraping
- Instagram has strict anti-scraping measures
- Public profile scraping may not work reliably
- Consider using Instagram's official Graph API for production
- The current implementation is basic and may return limited data

### Website Scraping
- Some websites may block automated requests
- JavaScript-rendered content may not be accessible (would require Puppeteer)
- Rate limiting: be careful not to make too many requests too quickly

### Detection Accuracy
- Keyword-based detection may have false positives/negatives
- "Semlor" mentions don't always mean they're currently available
- Consider this a starting point for manual verification

## Future Improvements

1. **Puppeteer Integration**: For JavaScript-heavy websites
2. **Instagram API**: Use official API for reliable Instagram data
3. **Scheduled Scraping**: Automatically update bakery data periodically
4. **Manual Override**: Allow users to manually set semlor status
5. **Image Recognition**: Detect semlor in Instagram photos using AI
6. **Scraping Queue**: Background job queue for bulk scraping
7. **More Keywords**: Add seasonal variations and languages

## Best Practices

1. **Respect robots.txt**: Check website's robots.txt before scraping
2. **Rate Limiting**: Add delays between requests (already implemented for bulk scraping)
3. **User-Agent**: Use appropriate User-Agent headers (already included)
4. **Caching**: Store scraped data to avoid repeated requests
5. **Error Handling**: Gracefully handle failures and timeouts
6. **Manual Verification**: Use scraping as a starting point, verify manually when possible

## Ethical Considerations

- Web scraping should be done responsibly
- Respect website terms of service
- Don't overload servers with requests
- Consider using official APIs when available
- Be transparent about data collection methods
