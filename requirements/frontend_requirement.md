# Project overview

Use this guide to build a web app where users can track important dates and get gift suggestions for their friends and family based on relationships and interests.

# Feature requirements

- We will use Next.js, Shadcn, Tailwind CSS, TypeScript, Supabase
- Create a form where users can add contacts with name, relationship type, and optional interests
- Implement date tracking for birthdays, anniversaries, and other important events
- Use Claude AI to generate personalized gift suggestions based on relationship and interests
- Have a dashboard showing upcoming events in the next 30 days with countdown
- Display gift suggestions in a clean card-based layout with 3-5 ideas per contact
- When viewing contact details, show their important dates and gift suggestions
- Email notifications for events coming up in 7 days

# Relevant docs

## How to use Claude API for gift suggestions

The app will use Claude to generate personalized gift ideas based on the contact's relationship type and interests. See API implementation details in api/gift-suggestions/route.ts.

## How to set up Supabase

Database schema includes tables for users, contacts, and important dates with proper relationships and row-level security policies.

# Current File structure

giftful/
├── app/
│ ├── api/
│ │ ├── gift-suggestions/
│ │ │ └── route.ts
│ │ └── notify/
│ │ └── route.ts
│ ├── auth/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ └── register/
│ │ └── page.tsx
│ ├── contacts/
│ │ ├── [id]/
│ │ │ └── page.tsx
│ │ ├── add/
│ │ │ └── page.tsx
│ │ └── page.tsx
│ ├── dashboard/
│ │ └── page.tsx
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── ui/
│ │ └── [shadcn components]
│ ├── auth/
│ │ ├── login-form.tsx
│ │ └── register-form.tsx
│ ├── contact/
│ │ ├── contact-card.tsx
│ │ ├── contact-form.tsx
│ │ └── date-form.tsx
│ ├── dashboard/
│ │ ├── upcoming-dates.tsx
│ │ └── date-countdown.tsx
│ ├── gift/
│ │ └── gift-suggestions.tsx
│ ├── layout/
│ │ ├── header.tsx
│ │ ├── sidebar.tsx
│ │ └── footer.tsx
│ └── shared/
│ └── loading-spinner.tsx
