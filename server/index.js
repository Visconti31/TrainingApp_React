import { ApolloServer } from 'apollo-server'
import { gql } from 'graphql-tag'
import mongoose from 'mongoose'

import { MONGO_URL } from './config.js'

import Exercise from './models/Exercise.js'

const typeDefs = gql`
  type Exercise {
    id: ID!
    name: String!
    bodyPart: String!
    category: String!
  }
  type Query {
    getExercises: [Exercise]
  }
`

const resolvers = {
  Query: {
    async getExercises() {
      try {
        const exercises = await Exercise.find()
        return exercises
      } catch (error) {
        throw new Error(error)
      }
    },
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
