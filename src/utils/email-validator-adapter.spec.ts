import { EmailValidatorAdapter } from './email-validator-adapter'
import Joi from 'joi'
const mockValidate = jest.fn(() => ({ error: false }))
const mockIsEmail = jest.fn(() => ({
  validate: mockValidate
}))
jest.mock('joi', () => ({
  string: jest.fn(() => ({
    email: mockIsEmail
  }))
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return false if Joi returns error', () => {
    const sut = makeSut()
    mockValidate.mockReturnValueOnce({ error: true })
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should call Joi validation methods with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@mail.com')
    expect(Joi.string).toHaveBeenCalled()
    expect(mockIsEmail).toHaveBeenCalled()
    expect(mockValidate).toHaveBeenCalledWith('any_email@mail.com')
  })
})
