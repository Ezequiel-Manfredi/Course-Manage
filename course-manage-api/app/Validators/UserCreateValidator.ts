import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MINIMUM_PASSWORD_LENGTH, Roles } from 'App/Utils/constants'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.confirmed(), rules.minLength(MINIMUM_PASSWORD_LENGTH)]),
    role: schema.enum(Object.values(Roles)),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
    'role.enum': 'The value must be one of {{ options.choices }}',
  }
}
