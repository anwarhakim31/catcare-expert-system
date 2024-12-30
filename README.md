# Catcare

Catcare is a project designed to provide comprehensive solutions for cat owners, focusing on easy diagnosis and tracking nearby veterinary clinics. The platform aims to enhance the health and well-being of cats

## TechStack

- NextJs
- Shadcn/ui
- TanStack Query
- React Hook Form
- Prisma
- PostgreSQL
- NestJS

## Third Party

- Google Map
  
## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm: Node.js package manager (comes with Node.js installation)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/anwarhakim31/catcare-expert-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd catcare-expert-system
   
   ```

3. Install dependencies

   ```bash
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   ```

## Setup Environment

1. Create a .env file in the root of your project.

   backend
   ```bash 

   ORIGIN = 
   
   DATABASE_URL=
   
   DIRECT_URL = 

   JWT_SECRET = 
   ```

   frontend
   ```bash 

   NEXT_PUBLIC_DOMAIN = 

   NEXT_PUBLIC_API_URL = exmple.domain/api

   JWT_SECRET = 

   NEXT_PUBLIC_CLOUD_PRESET = 
  
   NEXT_PUBLIC_CLOUD_NAME = 

   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 


   ```

## Development

1. To start the development server, run:
   
   backend
   ```bash
   npm run start:dev
   ```
   frontend 
    ```bash
   npm run dev
   ```

