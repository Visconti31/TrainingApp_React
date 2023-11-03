import { AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../config.js'

export default (context) => {
  const authHeader = context.req.headers.authorization

  // Check the authorization header was provided
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]

    // Check if user has a valid token
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY)
        return user
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired Token')
      }
    }

    // In case of no valid token provided
    throw new Error('Authentication token must be Bearer [token]')
  }

  // In case of no header provided
  throw new Error('Authentication header must be provided')
}
