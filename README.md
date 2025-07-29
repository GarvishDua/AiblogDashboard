# BloggingDashboard - AI Blog Generator Form

A modern, responsive React form that collects blog generation parameters and sends them to a webhook for AI processing.

## Features

- ✨ Modern UI with smooth animations
- 📱 Fully responsive mobile design
- 🎨 Dark theme with glassmorphism effects
- 🔄 Real-time form validation
- 🌟 Interactive loading states
- 📊 Category-based blog generation (Anime, Marvel, Manga)
- 🔗 Environment-based webhook configuration

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GarvishDua/AiblogDashboard.git
cd AiblogDashboard
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and set your webhook URL
VITE_WEBHOOK_URL=your_webhook_url_here
```

### Environment Variables

Create a `.env.local` file in the root directory with:

```
VITE_WEBHOOK_URL=http://localhost:5678/webhook-test/58473550-ed5a-4140-87a7-a28767175bf5
```

**Important**: 
- For local development, use your localhost webhook URL
- For production deployment (Vercel/Netlify), configure the production webhook URL in your deployment platform's environment variables

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Deployment

#### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard:
   - Go to your project settings → Environment Variables
   - Add `VITE_WEBHOOK_URL` with your production webhook URL
4. Deploy

#### Manual Build

```bash
npm run build
npm run preview
```

## Form Fields

- **Category**: Select from Anime, Marvel, or Manga
- **Keywords**: Comma-separated keywords for content generation (sent as string)
- **Prompt Text**: Detailed description or prompt for the AI

## Technical Stack

- **Frontend**: React 18 with Vite
- **Styling**: Custom CSS with animations
- **Build Tool**: Vite 5.x
- **Deployment**: Vercel ready

## API Integration

The form sends POST requests to the configured webhook URL with the following JSON structure:

```json
{
  "category": "anime",
  "keywords": "action, adventure, fantasy",
  "promptText": "Create a blog post about epic anime battles"
}
```

## Project Structure

```
src/
├── components/
│   ├── WebhookForm.jsx     # Main form component with webhook integration
│   └── WebhookForm.css     # Complete styling with animations and mobile responsiveness
├── App.jsx                 # Root component
├── App.css                 # App styling
├── main.jsx               # Entry point
└── index.css              # Global styles
.env.example               # Environment variables template
.env.local                 # Local environment variables (gitignored)
vercel.json               # Vercel deployment configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### Webhook Connection Issues

- **Localhost in Production**: If you see "Cannot connect to localhost webhook", make sure to set the `VITE_WEBHOOK_URL` environment variable in your deployment platform
- **CORS Errors**: Enable CORS on your webhook endpoint
- **Network Errors**: Verify your webhook URL is accessible and the service is running

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
