import { EmailValidator } from '../presentation/protocols/email-validator'
import Joi from 'joi'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    const schema = Joi.string().email()
    const { error } = schema.validate(email)
    return !error
  }
}
