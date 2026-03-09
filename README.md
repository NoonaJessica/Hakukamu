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

## AI Features

The app includes AI-powered feedback for job applications using Ollama.

### Setting up Ollama (Optional)

To enable AI feedback features:

1. **Install Ollama** from [ollama.ai](https://ollama.ai)

2. **Start the Ollama server**
   ```sh
   ollama serve
   ```

3. **Pull the llama3 model** (in a new terminal)
   ```sh
   ollama pull llama3
   ```

4. Make sure the server is running at `http://localhost:11434` (default)

The AI feedback feature will appear on the "Add Job" page and will help analyze and provide suggestions for job application notes.

### Troubleshooting AI Features

- If you see "Virhe AI-palautteen haussa", ensure Ollama is running (`ollama serve`)
- Make sure the llama3 model is installed (`ollama pull llama3`)
- Check that port 11434 is not blocked by a firewall

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


