import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PreceptorValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  private base = {
    middleName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
  }

  public create = schema.create({
    ...this.base,
    firstName: schema.string([rules.alpha({ allow: ['space'] })]),
    lastName: schema.string([rules.alpha({ allow: ['space'] })]),
    userId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })

  public modify = schema.create({
    ...this.base,
    firstName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
    lastName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
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
