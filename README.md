# Hakukamu - Job Application Tracker

A Svelte-based web application for tracking job applications and interviews. Built with SvelteKit, Drizzle ORM, and SQLite.

## Project Setup

To recreate this project with the same configuration:

```sh
npx sv create --template minimal --types ts --add prettier eslint vitest="usages:unit,component" tailwindcss="plugins:typography,forms" drizzle="database:sqlite+sqlite:libsql" --install npm Hakukamu
```

## Development

Install dependencies and start the development server:

```sh
npm install
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Database

### Setting up the database

The app uses SQLite with Drizzle ORM. The database is automatically initialized on first run.

### Running migrations

To apply database migrations:

```sh
npm run db:push
```

To generate new migrations after schema changes:

```sh
npm run db:generate
```

## Building

To create a production version of your app:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Deployment

### Prerequisites

- Node.js 18+ and npm

