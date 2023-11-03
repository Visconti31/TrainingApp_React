const validateRegisterInputs = (username, email, password, confirmPassword) => {
  const errors = {}

  // Username validation
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }

  // Email validation
  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!email.match(regEx)) {
      errors.email = 'Must be a valid email'
    }
  }

  // Password validation
  if (password.length <= 6) {
    errors.password = 'Password must have 6+ characters'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export { validateRegisterInputs }
