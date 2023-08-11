import * as dotenv from 'dotenv';
import * as express from 'express';

import connectDB from './db/mongoBdConnection';
import { initServer } from './utils/initApolloServer';

dotenv.config();

const PORT = process.env.PORT || 3001;

async function apolloServ() {
  const app = express();

  await initServer.start();
  app.use(express.json());

  initServer.applyMiddleware({ app });

  await connectDB();
  app.listen(PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${PORT}/graphql`
    );
  });
}

apolloServ();
