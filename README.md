# TeamPulse

TeamPulse is a set of tooling to collect and visualize key metrics that provide deep insights into team health, performance, development processes, and business outcomes. It is aimed to help teams make data-driven decisions to optimize their efficiency and project success.

## Motivation

You might be wondering why I built TeamPulse when there are plenty of other tools out there. Well, here's the deal:

### Tired of the "You Can't Use That" Game

- Working in big companies, I got frustrated hearing "we can't use external tools" all the time
- Every time we found a cool tool, it got stuck in security reviews forever
- Built this to run completely on your machine - no external services needed
- Your data stays on your computer where it belongs

### My Personal Playground

- Let's be honest - I love coding and trying out new tech
- This project lets me experiment with new libraries, tools and technical concepts so I can continue learning
- It's my way of staying sharp and having fun while building something useful
- Plus, I get to share something that might help other developers

## Features

Current metrics supported:

### DORA Metrics

- Deployment Frequency
- Lead Time for Changes
- Mean Time to Recovery (MTTR)
- Change Failure Rate

## Project Structure

The project is organized into two main components:

### Backend (`/backend`)

A TypeScript-based Express.js API that handles:

- Data collection from various sources: Project Management tools like Jira, VCS like Github, etc. (Git, CI/CD, Project Management tools)
- Metrics processing
- RESTful API endpoints
- Database interactions

Key technologies:

- Express.js
- TypeScript
- SQLite
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
npm run dev  # Runs on http://localhost:3000
```

### Database Setup

#### Seeding the Database

The project includes seed data to help you get started quickly. To populate your database with initial data:

1. First, ensure your database migrations are up to date:

```bash
npm run db:migrate
```

2. Run the seed command:

```bash
npm run db:seed
```

The seed data is maintained in `prisma/data` folder.

### Frontend Setup

1. Configure your frontend environment variables:

```bash
cd frontend
```

2. Start the frontend development server:

```bash
npm run dev  # Runs on http://localhost:5173
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

## Future Roadmap

These are some of the metrics that I aim to be addind in the future:

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

Feel free to update the content with more specific details about your implementation, configuration options, and deployment instructions as the project evolves.
```
