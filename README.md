# AI Travel Planner
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/dionisiusragil13/travel-plan)

Itinera.ai is an intelligent trip planning application that leverages artificial intelligence to generate personalized travel itineraries. Users can input their destination, travel dates, budget, interests, and preferences, and the system automatically creates optimized travel plans, recommends attractions, accommodations, and activities, and provides a seamless planning experience from start to finish.
The application is built with Next.js and features a modern, responsive user interface created with Tailwind CSS and Shadcn UI.

## Badges

[![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)](#) [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=fff)](#) [![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?logo=GoogleChrome&logoColor=white)](#) [![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#) ![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=visualstudiocode&logoColor=white) [![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)](#) [![ReadMe](https://img.shields.io/badge/ReadMe-018EF5?logo=readme&logoColor=fff)](#) [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#) [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#) [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#) [![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#) [![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](#) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#) [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#) [![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#) [![JSON](https://img.shields.io/badge/JSON-000?logo=json&logoColor=fff)](#)

## Features

-   **AI-Powered Itinerary Generation**: Leverages the Google Gemini API to create detailed travel plans.
-   **User Authentication**: Secure user registration and login functionality.
-   **Customizable Travel Preferences**: Input fields for destination, duration, budget, travel style, group size, and other preferences.
-   **Responsive Design**: A complete landing page and application interface that works on both desktop and mobile devices.
-   **Detailed Itineraries**: The generated plan includes daily activities, dining recommendations, and estimated costs.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **Database**: PostgreSQL
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **AI**: [Google Gemini API](https://ai.google.dev/)
-   **Authentication**: Password hashing with [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
-   **Languages**: TypeScript

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v20 or later)
-   npm, yarn, or pnpm
-   A running PostgreSQL database instance.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dionisiusragil13/travel-plan.git
    cd travel-plan
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your actual credentials.

    ```env
    # Your PostgreSQL connection string
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # Your Google Gemini API Key
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

4.  **Set up the database:**
    Run the Prisma migration to sync the database schema.
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Endpoints

The application exposes several API endpoints under the `/api` directory:

-   `POST /api/auth/register`: Handles new user registration.
-   `POST /api/auth/login`: Authenticates and logs in a user.
-   `POST /api/plan/generate`: Receives travel preferences and returns an AI-generated itinerary.

## Project Structure

The repository is organized as follows:

-   `app/`: Contains the core application logic, following the Next.js App Router structure.
    -   `(auth)/`: Auth-related pages like Login and Signup.
    -   `api/`: API route handlers for backend functionality.
    -   `travel/`: The page for users to input their travel preferences.
-   `components/`: Reusable React components, including UI components built with Shadcn.
-   `lib/`: Utility functions, Prisma client instance, and authentication logic.
-   `prisma/`: Prisma schema definition (`schema.prisma`) and migrations.
-   `service/`: Services that interact with external APIs, such as the Gemini service.
-   `public/`: Static assets, including images.
