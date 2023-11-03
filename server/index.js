import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

import { MONGO_URL } from './config.js'

import typeDefs from './graphql/typeDefs.js'
import resolvers from './resolvers/index.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({
      port: 5000,
    })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
