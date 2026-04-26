import { validateEmail, validatePassword, validateName } from '@/lib/auth'

describe('validateEmail', () => {
  it('should return null when email is valid', () => {
    // Arrange — entrées pures
    const email = 'alex@example.com'

    // Act — appel direct de la fonction pure
    const result = validateEmail(email)

    // Assert — valeur de retour attendue
    expect(result).toBeNull()
  })

  it('should return required error when email is empty', () => {
    // Arrange
    const email = ''

    // Act
    const result = validateEmail(email)

    // Assert
    expect(result).toBe('Email is required.')
  })

  it('should return invalid format error when email lacks @', () => {
    // Arrange
    const email = 'alexexample.com'

    // Act
    const result = validateEmail(email)

    // Assert
    expect(result).toBe('Please enter a valid email address.')
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

  it('should return required error when password is empty', () => {
    // Arrange
    const password = ''

    // Act
    const result = validatePassword(password)

    // Assert
    expect(result).toBe('Password is required.')
  })

  it('should return length error when password is too short', () => {
    // Arrange
    const password = 'abc123'

    // Act
    const result = validatePassword(password)

    // Assert
    expect(result).toBe('Password must be at least 8 characters.')
  })
})

describe('validateName', () => {
  it('should return null when name is non-empty', () => {
    // Arrange
    const name = 'Alexandre'

    // Act
    const result = validateName(name)

    // Assert
    expect(result).toBeNull()
  })

  it('should return required error when name is empty string', () => {
    // Arrange
    const name = ''

    // Act
    const result = validateName(name)

    // Assert
    expect(result).toBe('Name is required.')
  })

  it('should return whitespace error when name is only spaces', () => {
    // Arrange
    const name = '   '

    // Act
    const result = validateName(name)

    // Assert
    expect(result).toBe('Name cannot be empty or whitespace.')
  })
})
