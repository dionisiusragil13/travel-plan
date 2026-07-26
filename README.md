# AI Travel Planner

**Itinera.ai** is an intelligent trip planning application that leverages artificial intelligence to generate personalized travel itineraries. Users can input their destination, travel dates, budget, interests, and preferences, and the system automatically creates optimized travel plans, recommends attractions, accommodations, and activities, providing a seamless planning experience from start to finish.

Built with **Next.js 15** (App Router), **React 19**, **Tailwind CSS 4**, **Shadcn UI**, **Prisma ORM**, **PostgreSQL**, and **Google Gemini AI**.

## Features

- **AI-Powered Itinerary Generation**: Leverages Google Gemini AI to create detailed, personalized travel plans based on user preferences
- **User Authentication**: Secure user registration and login with bcrypt password hashing and JWT tokens
- **Customizable Travel Preferences**: Input fields for destination, duration, budget, travel style, group size, and preferences
- **Responsive Design**: Modern, responsive UI built with Tailwind CSS and Shadcn UI components (works on desktop and mobile)
- **Detailed Itineraries**: Generated plans include daily activities, dining recommendations, estimated costs, and travel tips
- **PDF Export**: Download generated itineraries as PDF documents
- **Dark Mode Support**: Built-in dark/light theme support with next-themes
- **PostgreSQL Database**: Persistent storage with Prisma ORM

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **UI Components** | [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **AI** | [Google Gemini API](https://ai.google.dev/) |
| **Authentication** | bcryptjs + JWT (custom auth) |
| **Forms/Validation** | [Zod](https://zod.dev/) |
| **PDF Generation** | [@react-pdf/renderer](https://react-pdf.org/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) via Shadcn |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Date/Time** | [date-fns](https://date-fns.org/) (via Shadcn) |

## Project Structure

```
my-travel-app/
├── app/
│   ├── (auth)/           # Auth route group (login, signup)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── api/
│   │   ├── auth/         # Auth API routes (login, logout, register, me)
│   │   └── plan/         # Plan API routes (generate, download)
│   ├── travel/           # Travel planning page
│   │   ├── page.tsx
│   │   └── travel-content.tsx
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── assets/
│   └── logo/             # Logo components
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── pro-blocks/       # Landing page blocks
│   ├── shadcn-space/     # Additional Shadcn blocks
│   ├── shadcn-studio/    # Studio components
│   ├── download-button.tsx
│   ├── faq.tsx
│   ├── features.tsx
│   ├── footer.tsx
│   ├── login-form.tsx
│   ├── logo.tsx
│   ├── nav-menu.tsx
│   ├── navbar.tsx
│   ├── navigation-sheet.tsx
│   ├── signup-form.tsx
│   ├── spinner-button-1.tsx
│   ├── testimonials.tsx
│   └── trip-plan-result.tsx
├── hooks/                # Custom React hooks
├── lib/
│   ├── auth/             # Auth utilities (login, register)
│   ├── generated/prisma/ # Generated Prisma client
│   ├── plan/             # Plan utilities (download)
│   ├── auth.ts           # Auth helpers
│   ├── env.ts            # Environment validation
│   ├── prisma.ts         # Prisma client singleton
│   └── utils.ts          # Utility functions
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── service/
│   └── gemini.service.ts # Google Gemini AI service
├── types/
│   └── tripInput.ts      # Trip input types
├── .env                  # Environment variables (not committed)
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── components.json       # Shadcn UI config
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
├── README.md
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

## Getting Started

### Prerequisites

- **Node.js** v20 or later
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** database (local or hosted - e.g., Supabase, Neon, Railway)
- **Google Gemini API Key** (get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dionisiusragil13/travel-plan.git
   cd travel-plan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root:
   ```env
   # PostgreSQL Database URL
   # Get this from your PostgreSQL provider (Supabase, Neon, Railway, etc.)
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

   # Google Gemini API Key
   # Get from: https://aistudio.google.com/apikey
   GEMINI_API_KEY="your-gemini-api-key-here"

   # JWT Secret (generate a secure random string)
   JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
   ```

4. **Set up the database:**
   ```bash
   npx prisma migrate dev --name init
   # or if you already have a schema:
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the application:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma studio` | Open Prisma Studio (DB GUI) |
| `npx prisma db push` | Push schema changes to DB |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/logout` | User logout |
| `GET` | `/api/auth/me` | Get current user |
| `POST` | `/api/plan/generate` | Generate AI travel plan |
| `POST` | `/api/plan/download` | Download plan as PDF |

### Generate Travel Plan Request

```json
POST /api/plan/generate
Content-Type: application/json

{
  "destination": "Bali, Indonesia",
  "duration": 5,
  "budget": 5000000,
  "style": "backpacker",
  "group": "2",
  "preference": "beach, culture, food"
}
```

### Generate Travel Plan Response

```json
{
  "summary": {
    "destination": "Bali, Indonesia",
    "duration": 5,
    "budget": 5000000,
    "style": "backpacker",
    "group": 2
  },
  "budgetBreakdown": {
    "accommodation": 1500000,
    "food": 1000000,
    "transportation": 800000,
    "attractions": 700000,
    "other": 1000000
  },
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Beach Day",
      "activities": [
        { "time": "09:00", "activity": "Check-in", "location": "Hotel", "estimatedCost": 0 },
        { "time": "11:00", "activity": "Beach time", "location": "Kuta Beach", "estimatedCost": 50000 }
      ],
      "recommendedFood": ["Nasi Goreng", "Babi Guling"],
      "dailyBudget": 1000000
    }
  ],
  "tips": ["Bring sunscreen", "Try local warungs"]
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `JWT_SECRET` | Yes | Secret key for JWT tokens (min 32 chars) |

## Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

Make sure to:
- Set `DATABASE_URL` to your production PostgreSQL URL
- Set `GEMINI_API_KEY` from Google AI Studio
- Set `JWT_SECRET` to a secure random string
- Run `npx prisma migrate deploy` in build command or as a separate step

### Docker (Alternative)

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Development

### Adding Shadcn UI Components

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
# etc.
```

### Database Changes

```bash
# After modifying prisma/schema.prisma
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

### Code Quality

```bash
npm run lint          # Run ESLint
npx tsc --noEmit      # Type checking
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Shadcn UI](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Google Gemini](https://ai.google.dev/) - Generative AI
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## Support

If you find this project helpful, please give it a ⭐ on GitHub!

For questions or issues, please open a [GitHub Issue](https://github.com/dionisiusragil13/travel-plan/issues).