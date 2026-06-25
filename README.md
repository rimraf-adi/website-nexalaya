# Nexalaya Landing Page

Nexalaya is a proxy-proof, IoT-powered attendance system built for Indian colleges. It allows professors to take attendance in 10 seconds via a local network module, eliminating proxy fraud and automatically generating NAAC-ready reports.

This repository contains the frontend landing page, built using Next.js, and the demo-request system.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** CSS Modules with Vanilla CSS (No Tailwind)
- **Typography:** Outfit (Display) & Inter (Body) via Google Fonts
- **Backend APIs:** Next.js Route Handlers
- **Email Delivery:** Nodemailer
- **Media Delivery & Storage:** Vercel Blob CDN for ultra-fast, optimized images

## Environment Variables

To run the full feature set locally, create a `.env.local` file in the root directory:

```env
# Gmail App Password for sending demo request confirmations
EMAIL_APP_PASSWORD=your_gmail_app_password_here

# Vercel Blob credentials for image assets
BLOB_STORE_ID=store_zMi2SVDOI5uASiYi
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_zMi2SVDOI5uASiYi_sgyKC9g9wSFYa1GMnUcxguiZWMl1Cb
```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages, sitemaps, favicons, robots rules, and API routes (`/api/notify`).
- `components/` - Highly structured React components (`Navbar`, `Hero`, `HowItWorks`, `Features`, `Impact`, `NotifySection`, `Footer`) and their custom CSS modules.
- `public/` - Static assets and local images.
- `template.html` - The HTML email template used by Nodemailer to send clean, styled demo confirmations.
- `globals.css` - Global design tokens, primary royal blue color palette (`#2F54FF`), font imports, and base animations.
