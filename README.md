# Spryware Dashboard

A comprehensive project management dashboard built with React, TypeScript, and Material-UI.

## Features

- Project management and tracking
- Daily reports
- RFI tracking
- Time tracking
- Safety checks
- Document management
- Photo uploads
- Task management
- Vendor management
- Client view

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spryware-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── constants.ts   # Constant values
└── App.tsx        # Main application component
```

## Usage

1. Select a project from the dashboard
2. Navigate between different tabs to manage various aspects of the project
3. Use the forms to add new entries (reports, RFIs, tasks, etc.)
4. Upload files and photos as needed
5. Track time and safety checks
6. Manage vendors and subcontractors

## Data Storage

The application uses localStorage for data persistence. All project and vendor data is stored locally in the browser.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 