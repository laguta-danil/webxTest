import { ApolloServer } from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';

import { resolvers } from '../graphql/resolvers';
import { typeDefs } from '../graphql/typeDefs';
import { IReq } from '../interfaces/user.interface';
import User from '../models/User';

export const initServer = new ApolloServer({
  context: async (req: any): Promise<IReq> => {
    try {
      const { authorization } = req.headers;

      const token = authorization.replace('Bearer ', '');

      const decodedJwt: any = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedJwt.userId);

      if (!user || !authorization) {
        return { error: 'Invalid auth token ' };
      }

      return { user };
    } catch (error) {
      return { error: error.message || 'An error occurred' };
    }
  },
  introspection: true,
  persistedQueries: false,
  resolvers,
  typeDefs
});
