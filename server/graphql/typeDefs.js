import { gql } from 'graphql-tag'

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

export default typeDefs
