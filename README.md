# Quote Generator App

A beautiful, modern quote generator built with React, TypeScript, Express, and Tailwind CSS. Features dark/light theme support, favorites management, and social sharing.

## Features

- 🎨 **Beautiful Design**: Modern, responsive UI with dark/light theme support
- 📱 **Mobile-First**: Fully responsive design that works on all devices
- 🔄 **Fresh Quotes**: Random quote generation from curated collection
- ❤️ **Favorites**: Save your favorite quotes locally
- 📤 **Share**: Share quotes on Twitter, Facebook, or copy to clipboard
- 🖼️ **Download**: Generate and download quote images
- 🌙 **Dark Mode**: Seamless theme switching with smooth transitions
- ⚡ **Fast**: Built with Vite for optimal performance

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Data**: In-memory storage with sample quotes
- **Build**: Vite for development and production
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd quote-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

This app is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy

## Project Structure

```
├── client/              # Frontend React app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
├── server/              # Backend Express app
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data storage
├── shared/              # Shared types and schemas
└── dist/                # Production build output
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking

## License

MIT License

## Author

Built with ❤️ for inspiration seekers