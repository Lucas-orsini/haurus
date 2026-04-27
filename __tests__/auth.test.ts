import {
  validateEmail,
  validatePassword,
  validateName,
  type AuthUser,
} from '@/lib/auth'

// ── validateEmail ──────────────────────────────────────────────────────────────

describe('validateEmail', () => {
  it('should return null when email is valid', () => {
    // Arrange — valid email strings
    // Act
    const result = validateEmail('user@example.com')
    // Assert
    expect(result).toBeNull()
  })

  it('should return required error when email is empty', () => {
    // Arrange — empty string
    // Act
    const result = validateEmail('')
    // Assert
    expect(result).toBe('Email is required.')
  })

  it('should return error when email is whitespace only', () => {
    // Arrange — whitespace-only string
    // Act
    const result = validateEmail('   ')
    // Assert
    expect(result).toBe('Email cannot be empty or whitespace.')
  })

  it('should return error when email is missing @', () => {
    // Arrange — missing @ symbol
    // Act
    const result = validateEmail('userexample.com')
    // Assert
    expect(result).toBe('Please enter a valid email address.')
  })

  it('should return error when email is missing domain', () => {
    // Arrange — no domain after @
    // Act
    const result = validateEmail('user@')
    // Assert
    expect(result).toBe('Please enter a valid email address.')
  })

  it('should return error when email is missing local part', () => {
    // Arrange — no local part before @
    // Act
    const result = validateEmail('@example.com')
    // Assert
    expect(result).toBe('Please enter a valid email address.')
  })

  it('should trim whitespace before validation', () => {
    // Arrange — email with surrounding spaces
    // Act
    const result = validateEmail('  user@example.com  ')
    // Assert
    expect(result).toBeNull()
  })
})

// ── validatePassword ───────────────────────────────────────────────────────────

describe('validatePassword', () => {
  it('should return null when password meets minimum length', () => {
    // Arrange — 8+ characters
    // Act
    const result = validatePassword('password123')
    // Assert
    expect(result).toBeNull()
  })

  it('should return required error when password is empty', () => {
    // Arrange — empty string
    // Act
    const result = validatePassword('')
    // Assert
    expect(result).toBe('Password is required.')
  })

  it('should return error when password is shorter than 8 characters', () => {
    // Arrange — 7 characters
    // Act
    const result = validatePassword('short1!')
    // Assert
    expect(result).toBe('Password must be at least 8 characters.')
  })

  it('should return null when password is exactly 8 characters', () => {
    // Arrange — exactly 8 characters
    // Act
    const result = validatePassword('12345678')
    // Assert
    expect(result).toBeNull()
  })
})

// ── validateName ───────────────────────────────────────────────────────────────

describe('validateName', () => {
  it('should return null when name is valid', () => {
    // Arrange — non-empty name
    // Act
    const result = validateName('John Doe')
    // Assert
    expect(result).toBeNull()
  })

  it('should return required error when name is empty', () => {
    // Arrange — empty string
    // Act
    const result = validateName('')
    // Assert
    expect(result).toBe('Name is required.')
  })

  it('should return error when name is whitespace only', () => {
    // Arrange — whitespace-only string
    // Act
    const result = validateName('    ')
    // Assert
    expect(result).toBe('Name cannot be empty or whitespace.')
  })

  it('should trim whitespace before validation', () => {
    // Arrange — name with surrounding spaces
    // Act
    const result = validateName('  Alice  ')
    // Assert
    expect(result).toBeNull()
  })
})
