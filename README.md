Company Management System
A web application for managing company information with authentication and CRUD operations.
Features

User Authentication (Login/Register)
Company Management

Create new companies
View list of companies
Edit company details
Delete companies


Pagination
Search functionality

Technologies Used

Frontend:

React 18
TypeScript
Ant Design (UI Framework)
React Query (State Management)
Axios (HTTP Client)
React Router (Navigation)
Tailwind CSS (Styling)


Additional Tools:

ESLint (Code Linting)
Prettier (Code Formatting)
Vite (Build Tool)



Getting Started
Prerequisites

Node.js (version 16 or higher)
npm or yarn

Installation

Clone the repository

bashCopygit clone [https://github.com/falkoniydev/companies.git](https://github.com/falkoniydev/companies.git)

Install dependencies

bashCopycd company-management-system
npm install
# or
yarn install

Configure environment variables
Create a .env file in the root directory and add:

envCopyVITE_API_URL=http://your-backend-url

Start the development server

bashCopynpm run dev
# or
yarn dev
Usage

Register a new account or login with existing credentials
Navigate to the dashboard to manage companies
Use the search bar to find specific companies
Add new companies using the "Add Company" button
Edit or delete companies using the action menu
Use pagination to navigate through the list of companies

Project Structure
Copysrc/
├── components/         # Reusable UI components
├── pages/             # Page components
├── services/          # API service layers
├── lib/              # Configuration and utilities
├── types/            # TypeScript type definitions
├── routes/           # Route configurations
└── assets/           # Static assets
Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details
Contact
Shokhboz Nabiev - @falkoniydev - falkoniydev@gmail.com
Project Link: [https://github.com/falkoniydev/companies](https://github.com/falkoniydev/companies)
