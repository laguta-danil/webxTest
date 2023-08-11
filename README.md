This application allows you to use User registration and authorization, as well as two-factor authorization using a QR
code.
The application is not written in NodeJs(express), Apollo-graphql-server.

Installation:

- Clone this repository.

- Install dependencies using Yarn:
  yarn

- Write your path to the .env file with your MongoDB URI.
  Also write port and secret.
  In .env.example you can find all keys.

- Start the server:
  yarn start

- Access the GraphQL UI at http://localhost:${PORT}/graphql.

