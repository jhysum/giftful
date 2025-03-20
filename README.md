# Giftful

Giftful is a web application that helps you track important dates and get personalized gift suggestions for your friends and family members. Built with Next.js, Supabase, and Claude AI.

## Features

- Track important dates (birthdays, anniversaries, etc.)
- Get AI-powered gift suggestions based on relationships and interests
- Email notifications for upcoming events
- Clean and modern UI with shadcn/ui components
- Secure authentication with Supabase

## Tech Stack

- Frontend: React.js, Next.js
- Backend: Next.js API routes
- Database: Supabase
- Authentication: Supabase Auth
- Styling: Tailwind CSS with shadcn/ui components
- Language: TypeScript
- Package Management: npm/npx
- AI Integration: Anthropic Claude API
- Scheduled Tasks: Pipedream for email notifications
- Hosting: Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Anthropic Claude API key
- Pipedream account (for email notifications)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ANTHROPIC_API_KEY=your_claude_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/giftful.git
   cd giftful
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Create a new Supabase project
   - Run the SQL commands in `supabase/schema.sql` to create the necessary tables
   - Set up Row Level Security (RLS) policies as defined in the schema

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following tables:

- `users`: Stores user information
- `contacts`: Stores contact information
- `important_dates`: Stores important dates for contacts
- `gift_suggestions`: Stores AI-generated gift suggestions

## Email Notifications

Email notifications are handled by Pipedream:

1. Create a new Pipedream workflow
2. Set up a daily trigger (e.g., at 8:00 AM)
3. Add a Node.js step to fetch upcoming events
4. Add an email step to send notifications
5. Deploy the workflow

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
