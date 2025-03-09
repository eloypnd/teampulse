# TeamPulse backend

TeamPulse's backend service as a TypeScript-based Express application that uses Prisma as the ORM and Jest for testing.

## Features

TeamPulse backend provides these key capabilities:

- RESTful API endpoints for frontend
- Database operations via Prisma ORM
- [Commands](./src/commands/) for data synchronization with external tools
  - GitHub
  - Jira

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm (Node package manager)

### Installation

The instructions for installing this project are in the root [README](../README.md) file.

### Backend Setup

1. Configure your backend environment variables (for Github and Jira integrations):

   ```bash
   cp .env.example .env
   ```

2. Set up the database:

   ```bash
   npm run db:migrate
   npm run db:seed  # Optional: adds sample data
   ```

3. Start the backend server:

   ```bash
   npm run dev  # Runs on http://localhost:3000
   ```

### Database

This project is meant to be runned locally, therefore the databese of choice is SQLite to keep things simple.

The other database related choice in this project is to use Prisma ORM for defining the [data model](./prisma/schema.prisma) and handling data operations.

#### Database operations

1. Data migrations

   ```bash
   npm run db:migrate
   ```

2. Add sample data

   ```bash
   npm run db:seed
   ```

   The seed data is maintained in `prisma/data` folder.

   > The seed script will create:
   >
   > - Source tools (GitHub, Jira)
   > - Sample user (John Doe)
   > - Sample repository
   > - Common labels (bug, feature)
   > - `n` pull requests samples from Github and `m` issues from Jira
   >
   > For development purposes, the seed script will first clean existing data before inserting new records.

### Running the Application

To start the application, run:

```
npm run start
```

### Running Tests

To run the tests, use:

```
npm run test
```

## Folder Structure

- `src/` - Contains the source code for the application
  - `serve.ts` - Entry point of REST API
  - `commands/` - Contains commands to fetch data from external tools
  - `domain/` - Contains business logic and data interactions
  - `routes/` - Defines the application routes
  - `types/` - Defines TypeScript interfaces
  - `utils/` - Utility functions
- `prisma/` - Contains the Prisma schema and seed data

## Database Setup and Seeding

The application uses Prisma as the ORM and includes seed data for development purposes.

## License

This project is licensed under the MIT License.
