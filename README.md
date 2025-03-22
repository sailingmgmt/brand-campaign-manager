# brand-campaign-manager
Discord bot for managing brand creator campaigns. 
# Brand Campaign Manager Bot

A Discord bot for managing brand creator campaigns and influencer marketing initiatives.

## Features

- 🎯 Create campaign channels with budget, requirements, and description
- 📥 Accept content submissions from creators
- 🔄 Automatic channel management
- 🤝 Integration ready for Make.com

## Commands

### /create-campaign
Create a new campaign with:
- Campaign name
- Description
- Requirements
- Budget

### /submit
Submit content to campaigns:
- Content link (TikTok/Instagram)
- Description of content

## Setup

1. Add bot token to Railway environment variables:
   - `DISCORD_TOKEN`
   - `CLIENT_ID`

2. Deploy to Railway
   - Connect this repository
   - Add environment variables
   - Deploy!

## Development

```bash
# Install dependencies
npm install

# Deploy commands
node src/deploy-commands.js

# Start bot
npm start

# Development mode
npm run dev
```

## License

MIT