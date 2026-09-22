# IvoxStack — Digital Solutions Platform

> **Digital Solutions Built for Business Growth**  
> Complete web engineering, performance advertising, creative design, and business automation platforms built for modern enterprises.

---

## 📁 Project Architecture & Folder Structure (Beginner Friendly)

This project is organized into a clean, modular structure where the **Frontend** and **Backend** are clearly separated:

```
IvoxStack/
│
├── 🛠️ backend/                    # Backend & Database Layer
│   ├── database/                  # Supabase SQL database schemas & migrations
│   │   ├── 001_initial_schema.sql # Core tables (leads, clients, projects, invoices, cms)
│   │   ├── 002_rls.sql            # Row Level Security (RLS) policies
│   │   └── 003_seed_data.sql      # Initial catalog & seed data
│   └── functions/                 # Netlify Serverless API endpoints & webhooks
│       ├── admin-stats.ts         # Operations analytics endpoint
│       ├── backup-data.ts         # Database snapshot backup
│       ├── create-lead.ts         # Lead intake validation
│       ├── export-leads.ts        # CSV export handler
│       ├── restore-data.ts        # Database restore handler
│       └── webhook-lead.ts        # Incoming webhook automation
│
├── 🌐 public/                     # Public Static Assets (Clean & Minimal)
│   ├── ivoxstack-icon-transparent.png # Official vector icon
│   ├── nva-infracon.png           # Client portfolio asset
│   ├── robots.txt                 # SEO crawler instructions
│   └── sitemap.xml                # SEO sitemap
│
├── 💻 src/                        # Frontend React Application
│   ├── admin/                     # Operations Admin Portal & CRM
│   │   ├── AdminLayout.tsx        # Sidebar & Topbar shell
│   │   ├── AdminLogin.tsx         # Secure admin login
│   │   ├── Dashboard.tsx          # Key metrics, MRR, lead velocity
│   │   ├── LeadsCRM.tsx           # Pipeline management (New, Contacted, Won, Lost)
│   │   ├── LeadDetail.tsx         # Detailed lead view & timeline
│   │   ├── Clients.tsx            # Client directory & contract values
│   │   ├── Projects.tsx           # Project milestone delivery tracker
│   │   ├── Invoices.tsx           # Invoices & payment logs
│   │   ├── ServicesCMS.tsx        # Services content editor
│   │   ├── PricingCMS.tsx         # Pricing catalog editor
│   │   ├── PortfolioCMS.tsx       # Portfolio item editor
│   │   ├── Reports.tsx            # Business intelligence & conversion rates
│   │   ├── ActivityLogs.tsx       # Audit trail & system logs
│   │   ├── Settings.tsx           # Platform settings, WhatsApp numbers, currency
│   │   └── BackupSecurity.tsx     # Cloud backup triggers & IP security
│   │
│   ├── components/                # Reusable UI Components
│   │   ├── BrandLogo.tsx          # IvoxStack brand lockup
│   │   ├── CostCalculator.tsx     # Real-time project cost calculator
│   │   ├── FloatingWhatsApp.tsx   # Persistent quick-contact widget
│   │   ├── Footer.tsx             # Global footer with legal links
│   │   ├── Header.tsx             # Global navigation bar & drawer
│   │   ├── HeroRotatingOrbit.tsx  # Interactive revolving services orbit
│   │   ├── LeadModal.tsx          # Universal inquiry lead modal
│   │   ├── PdfPreviewModal.tsx    # PDF portfolio viewer
│   │   ├── StartingPrices.tsx     # Transparent starting price cards
│   │   └── WhatsAppIcon.tsx       # Official WhatsApp vector icon
│   │
│   ├── lib/                       # Application Core & Utilities
│   │   ├── analytics.ts           # UTM tracking & click event telemetry
│   │   ├── store.ts               # State manager & localStorage fallback
│   │   ├── supabase.ts            # Supabase client connector
│   │   └── utils.ts               # Currency formatting (INR) & WhatsApp URL builders
│   │
│   ├── pages/                     # Public Website Pages
│   │   ├── AboutPage.tsx          # Company overview & principles
│   │   ├── CalculatorPage.tsx     # Dedicated cost estimation page
│   │   ├── CaseStudiesPage.tsx    # Verified client case studies
│   │   ├── ContactPage.tsx        # Direct contact & inquiry form
│   │   ├── DigitalAuditPage.tsx   # Free digital audit request page
│   │   ├── HomePage.tsx           # Main landing page
│   │   ├── NotFoundPage.tsx       # 404 page
│   │   ├── PortfolioPage.tsx      # Client portfolio & pitch decks
│   │   ├── PricingPage.tsx        # Categorized pricing catalog with URL sync
│   │   ├── ServicesPage.tsx       # 15 complete digital solutions
│   │   ├── ThankYouPage.tsx       # Post-inquiry confirmation page
│   │   └── legal/
│   │       └── LegalPages.tsx     # Privacy, Terms, Refund, Cookie, Revision policies
│   │
│   ├── types/                     # TypeScript Data Definitions
│   │   └── index.ts               # Centralized interfaces & models
│   │
│   ├── App.tsx                    # Main routing shell & modal providers
│   ├── index.css                  # Tailored design system, tokens & glassmorphism
│   ├── main.tsx                   # React root entry point
│   └── vite-env.d.ts              # Vite environment types
│
├── .env.example                   # Environment configuration template
├── index.html                     # HTML5 entry with IvoxStack metadata
├── netlify.toml                   # Netlify hosting & serverless function config
├── package.json                   # Dependencies & build scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS tokens & customized radii
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

---

## 🔐 Accessing Operations Admin Portal
- Navigate to `/operations/login` (e.g. `http://localhost:3000/operations/login`)
- Click **"Autofill Super Admin Credentials"** to quickly log in to the Operations Dashboard, Leads CRM, Projects, and CMS.
