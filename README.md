# Extensible User Management App

A modern responsive React + TypeScript application for managing users with full CRUD capabilities. Built with scalability and maintainability in mind.

## Features

- **Extensible Form Architecture**: Add new fields via configuration without touching component code.
- **Form Validation**: Robust schema-based validation using Zod and React Hook Form.
- **Responsive UI**: Clean, mobile-friendly interface built with Tailwind CSS.
- **Mock API**: Uses `json-server` to simulate a RESTful backend.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State/Form**: React Hook Form, Zod
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Backend Mock**: JSON Server

## getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the mock API server**
   Open a terminal and run:
   ```bash
   npm run server
   ```
   This will start the JSON server on port 3001.

3. **Start the development server**
   Open another terminal and run:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Add New Fields

The application is designed to be easily extensible. To add a new field (e.g., "Address" or "Date of Birth"):

1. Open `src/config/schema.ts`.
2. Add a new object to the `userFields` array:

   ```typescript
   {
     name: 'address',
     label: 'Address',
     type: 'text',
     validation: z.string().optional(), // Define validation rules
     placeholder: '123 Main St'
   }
   ```

   No other changes are required! The form component will automatically render the new input, apply validation, and handle data submission. The list view logic can be similarly extended if needed.

## Project Structure

- `src/config/`: Configuration files (schema, field definitions).
- `src/components/`: Reusable UI components and the `DynamicForm`.
- `src/pages/`: Page components (`UserList`, `UserFormPage`).
- `src/services/`: API interaction logic.
- `src/types/`: TypeScript type definitions.

## Deployment

The application can be deployed to any static host (Vercel, Netlify). Note that the mock API (`json-server`) will not work on static hosting; you would need a real backend for production.
