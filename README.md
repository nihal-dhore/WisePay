# WisePay - MERN Stack Payments App

## Overview

WisePay is a robust payments application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It employs modern technologies such as Zod for data validation, JWT for secure authentication, and Argon2 for password hashing. WisePay is designed to provide a seamless and secure payment experience for users.

## Features

- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Data Validation**: Zod is employed for comprehensive data validation, ensuring data integrity and security.
- **Password Security**: Passwords are hashed using the Argon2 algorithm, enhancing security and protecting user credentials.
- **Payment Processing**: Facilitates seamless payment processing, ensuring a smooth user experience.

## Technologies Used

- **MERN Stack**
  - MongoDB: NoSQL database for storing user data and payment information.
  - Express.js: Web application framework for building robust APIs.
  - React.js: Frontend library for building a dynamic and responsive user interface.
  - Node.js: Server-side JavaScript runtime for running the backend.

- **Zod**
  - A TypeScript-first schema declaration and validation library used for ensuring data consistency and security.

- **JSON Web Tokens (JWT)**
  - Securely handles authentication by generating and validating JSON web tokens.

- **Argon2**
  - Cryptographic hashing algorithm used for secure password storage.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/WisePay.git
```

2. Navigate to the project directory:

```bash
cd WisePay
```

3. Install dependencies:

```bash
npm install
```

4. Configure environment variables:

   Create a `.env` file in the root directory and set the following variables:

   ```env
   PORT=3000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

### Usage

1. Start the server:

```bash
npm run server
```

2. Start the React app:

```bash
npm run client
```

3. Open your browser and visit [http://localhost:3000](http://localhost:3000) to use WisePay.
