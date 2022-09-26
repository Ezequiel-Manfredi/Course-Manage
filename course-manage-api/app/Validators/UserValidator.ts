import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MINIMUM_PASSWORD_LENGTH, Roles } from 'App/Utils/constants'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  public create = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
    ]),
    password: schema.string({}, [
      rules.confirmed('passwordConfirmation'),
      rules.minLength(MINIMUM_PASSWORD_LENGTH),
    ]),
    role: schema.enum(Object.values(Roles)),
  })

  public modify = schema.create({
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
    ]),
    password: schema.string.optional({}, [
      rules.confirmed('passwordConfirmation'),
      rules.minLength(MINIMUM_PASSWORD_LENGTH),
    ]),
    role: schema.enum.optional(Object.values(Roles)),
  })

  private options = {
    POST: this.create,
    PUT: this.modify,
  }

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
    'role.enum': 'The value must be one of {{ options.choices }}',
  }
}
