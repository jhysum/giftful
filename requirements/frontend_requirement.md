# Giftful Frontend Requirements

## Project Overview

Giftful is a web application that helps users track important dates and get personalized gift suggestions for their friends and family. The app uses AI to generate thoughtful gift ideas based on relationships and interests.

## Technical Stack

- **Framework**: Next.js with React.js
- **Styling**: Tailwind CSS with shadcn/ui components
- **Language**: TypeScript
- **Package Management**: npm/npx
- **UI Components**: shadcn/ui
  - button
  - card
  - form
  - input
  - calendar
  - popover
  - toast
  - dialog
  - avatar
  - dropdown-menu

## Core Features

1. **Contact Management**

   - Add contacts with name, relationship type, and optional interests
   - View and manage contact details
   - Upload and display contact images

2. **Date Tracking**

   - Track birthdays, anniversaries, and other important events
   - View upcoming events in the next 30 days
   - Countdown display for upcoming events

3. **Gift Suggestions**

   - AI-powered personalized gift ideas based on relationship and interests
   - Clean card-based layout showing 3-5 ideas per contact
   - Price range display and descriptions
   - Refresh functionality for new suggestions

4. **Notifications**
   - Email notifications for events coming up in 7 days
   - Dashboard alerts for upcoming events

## Component Architecture

### Dashboard Page

- Main hub for viewing upcoming events
- Features:
  - Grid layout for upcoming dates
  - Loading states with Suspense boundaries
  - Responsive design for all screen sizes
  - Quick access to contact details and gift suggestions

### Upcoming Dates Component

- Displays events within the next 30 days
- Features:
  - Countdown timer for each event
  - Card-based layout with event details
  - Direct links to contact details
  - Automatic date calculations and sorting

### Contact Details Page

- Comprehensive view of contact information
- Features:
  - Three-column layout for larger screens
  - Contact information display
  - Important dates section
  - Gift suggestions section
  - Loading and error states

### Gift Suggestions Component

- Displays AI-generated gift ideas
- Features:
  - Grid layout for gift cards
  - Loading and error states
  - Refresh functionality
  - Price and description display
  - Responsive design

## Project Structure

```
giftful/
├── app/
│   ├── api/
│   │   ├── gift-suggestions/
│   │   │   └── route.ts
│   │   └── notify/
│   │       └── route.ts
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── contacts/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── add/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── [shadcn components]
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── contact/
│   │   ├── contact-card.tsx
│   │   ├── contact-form.tsx
│   │   └── date-form.tsx
│   ├── dashboard/
│   │   ├── upcoming-dates.tsx
│   │   └── date-countdown.tsx
│   ├── gift/
│   │   └── gift-suggestions.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   └── shared/
│       └── loading-spinner.tsx
```

## Integration Points

### Claude AI Integration

The app uses Claude AI to generate personalized gift suggestions. Implementation details can be found in `api/gift-suggestions/route.ts`.

### Supabase Integration

The app uses Supabase for data storage and authentication. The database schema includes tables for users, contacts, and important dates with proper relationships and row-level security policies.
