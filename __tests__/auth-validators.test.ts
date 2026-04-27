import { validateEmail, validatePassword, validateName } from '@/lib/auth'

describe('validateEmail', () => {
  // Arrange — entrée email brute
  // Act — appel direct de la fonction pure
  // Assert — message d'erreur retourné ou null

  it('should return null when email is valid', () => {
    // Arrange
    const email = 'alex@example.com'
    // Act
    const result = validateEmail(email)
    // Assert
    expect(result).toBeNull()
  })

  it('should return error message when email is empty string', () => {
    // Arrange
    const email = ''
    // Act
    const result = validateEmail(email)
    // Assert
    expect(result).toBe('Email is required.')
  })

  it('should return error message when email is whitespace only', () => {
    // Arrange
    const email = '   '
    // Act
    const result = validateEmail(email)
    // Assert
    expect(result).toBe('Email cannot be empty or whitespace.')
  })

  it('should return error message when email has no @ symbol', () => {
    // Arrange
    const email = 'alexexample.com'
    // Act
    const result = validateEmail(email)
    // Assert
    expect(result).toBe('Please enter a valid email address.')
  })

  it('should return error message when email has no domain after @', () => {
    // Arrange
    const email = 'alex@'
    // Act
    const result = validateEmail(email)
    // Assert
    expect(result).toBe('Please enter a valid email address.')
  })

  it('should return error message when email has no dot in domain', () => {
    // Arrange
    const email = 'alex@example'
    // Act
    const result = validateEmail(email)
    // Assert
    expect(result).toBe('Please enter a valid email address.')
  })

  it('should return null for trimmed email even with surrounding whitespace', () => {
    // Arrange
    const email = '  alex@example.com  '
    // Act
    const result = validateEmail(email)
    // Assert — trim is applied internally, so this should still be valid
    expect(result).toBeNull()
  })
})

describe('validatePassword', () => {
  it('should return null when password meets minimum length', () => {
    // Arrange
    const password = 'securePass123'
    // Act
    const result = validatePassword(password)
    // Assert
    expect(result).toBeNull()
  })

  it('should return error message when password is empty', () => {
    // Arrange
    const password = ''
    // Act
    const result = validatePassword(password)
    // Assert
    expect(result).toBe('Password is required.')
  })

  it('should return error message when password is exactly 7 characters', () => {
    // Arrange
    const password = 'abc1234'
    // Act
    const result = validatePassword(password)
    // Assert
    expect(result).toBe('Password must be at least 8 characters.')
  })

  it('should return null when password is exactly 8 characters', () => {
    // Arrange
    const password = 'abc12345'
    // Act
    const result = validatePassword(password)
    // Assert
    expect(result).toBeNull()
  })
})

describe('validateName', () => {
  it('should return null when name is valid', () => {
    // Arrange
    const name = 'Alex Dupont'
    // Act
    const result = validateName(name)
    // Assert
    expect(result).toBeNull()
  })

  it('should return error message when name is empty string', () => {
    // Arrange
    const name = ''
    // Act
    const result = validateName(name)
    // Assert
    expect(result).toBe('Name is required.')
  })

  it('should return error message when name is whitespace only', () => {
    // Arrange
    const name = '   '
    // Act
    const result = validateName(name)
    // Assert
    expect(result).toBe('Name cannot be empty or whitespace.')
  })
})
