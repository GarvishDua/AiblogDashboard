# Blogging Dashboard

A React application that provides a form interface for sending keywords and prompt text to webhooks in JSON format.

## Features

- **Keywords Input**: Enter multiple keywords separated by commas
- **Prompt Text**: Large textarea for entering prompt content
- **Webhook Integration**: Send form data as JSON to any webhook URL
- **Real-time Feedback**: Display success/error messages and webhook responses
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Supports both color schemes

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter your webhook URL in the first field
2. Add keywords separated by commas (e.g., "react, javascript, web development")
3. Write your prompt text in the textarea
4. Click "Send to Webhook" to submit the data

### JSON Payload Format

The application sends data in the following JSON format:

```json
{
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "promptText": "Your prompt text here...",
  "timestamp": "2025-01-20T10:30:00.000Z",
  "source": "blogging-dashboard"
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern features
- **Fetch API** - HTTP requests

## Project Structure

```
src/
├── components/
│   ├── WebhookForm.jsx     # Main form component
│   └── WebhookForm.css     # Form styling
├── App.jsx                 # Root component
├── App.css                 # App styling
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
