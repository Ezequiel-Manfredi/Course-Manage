import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PreceptorValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  public create = schema.create({
    firstName: schema.string(),
    middleName: schema.string.optional(),
    lastName: schema.string(),
    userId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })

  public modify = schema.create({
    firstName: schema.string.optional(),
    middleName: schema.string.optional(),
    lastName: schema.string.optional(),
    userId: schema.number.optional([rules.exists({ table: 'users', column: 'id' })]),
  })

  private options = {
    POST: this.create,
    PUT: this.modify,
  }

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
