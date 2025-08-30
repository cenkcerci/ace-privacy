# PolicyGen - Privacy & Cookie Policy Generator

Generate professional privacy and cookie policies for your website in 60 seconds.

## Features

- **Lightning Fast**: Generate both policies in under a minute
- **Jurisdiction Aware**: Tailored templates for Global, EU (GDPR), and US compliance
- **Ready to Use**: Copy HTML or download files ready for your website
- **User Authentication**: Sign up to save and track your policy generations
- **PDF Export**: Pro users can download policies as PDF files

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **PDF Generation**: jsPDF
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cenkcerci/ace-privacy.git
cd ace-privacy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Clerk keys to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/policy/generate/      # API endpoint for policy generation
│   ├── policy-generator/         # Policy generator page
│   ├── pricing/                  # Pricing page
│   ├── (auth)/                   # Authentication pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── Header.tsx               # Site header
│   └── Footer.tsx               # Site footer
└── lib/
    ├── templates/               # Policy templates
    └── utils.ts                # Utility functions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_DISABLE_CLERK` - Set to "true" to disable authentication (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Legal Disclaimer

This application generates template policies only. Users should consult with legal professionals to ensure compliance with applicable laws and regulations.