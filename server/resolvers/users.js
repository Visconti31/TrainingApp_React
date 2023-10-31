import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '../config.js'
import User from '../models/User.js'

export default {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure that user doesn't exist
      // TODO: Make sure that username is unique
      // TODO: Hash password and create an auth token
    },
  },
}
