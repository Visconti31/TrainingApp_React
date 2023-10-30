import { ApolloServer } from 'apollo-server'
import { gql } from 'graphql-tag'
import mongoose from 'mongoose'

import { MONGO_URL } from './config.js'

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`

const resolvers = {
  Query: {
    sayHi: () => 'Hello World',
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
