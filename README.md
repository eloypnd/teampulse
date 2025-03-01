# TeamPulse

TeamPulse is a comprehensive analytics platform designed to collect and visualize key metrics that provide deep insights into team health, performance, development processes, and business outcomes. By monitoring both long-term trends and daily operations, TeamPulse helps teams make data-driven decisions to optimize their efficiency and project success.

## Features

### Development Performance Metrics (DORA)
- Deployment Frequency
- Lead Time for Changes
- Mean Time to Recovery (MTTR)
- Change Failure Rate

### Agile Process Metrics
- Sprint Velocity
- Cycle Time & Lead Time
- Work in Progress (WIP) Limits
- Flow Efficiency: Commited vs Delivered

### DailyDevelopment Insights
- Pull Request Review Time
- Code Review Coverage
- Build & Test Success Rates
- Branch Lifetime Analytics
- Code Quality Metrics

### Business & Product Analytics
- TBA

## Project Structure

The project is organized into two main components:

### Backend (`/backend`)

A TypeScript-based Express.js API that handles:
- Data collection from various sources: Project Management tools like Jira, VCS like Github, etc. (Git, CI/CD, Project Management tools)
- Metrics processing and analytics
- RESTful API endpoints
- Database interactions

Key technologies:
- Express.js
- TypeScript
- PostgreSQL
- Jest for testing

### Frontend (`/frontend`)

A React Single Page Application (SPA) that provides insights into the team health and processes efficiency.

Key technologies:
- React
- TypeScript
- Chakra UI
- React Query
- Vite

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/TeamPulse.git
cd TeamPulse

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Usage

### Backend Setup

1. Configure your backend environment variables:
```bash
cd backend
cp .env.example .env
```

2. Set up the database:
```bash
npm run db:migrate
npm run db:seed  # Optional: adds sample data
```

3. Start the backend server:
```bash
npm run dev  # Runs on http://localhost:3001
```

### Frontend Setup

1. Configure your frontend environment variables:
```bash
cd frontend
cp .env.example .env
```

2. Start the frontend development server:
```bash
npm run dev  # Runs on http://localhost:3000
```

### Running the Complete Stack

You can also use the root package.json to run both services:
```bash
# From the project root
npm run dev  # Runs both frontend and backend
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Feel free to update the content with more specific details about your implementation, configuration options, and deployment instructions as the project evolves.
