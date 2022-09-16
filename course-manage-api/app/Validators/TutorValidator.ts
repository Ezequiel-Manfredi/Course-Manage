import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TutorValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  private base = {
    middleName: schema.string.optional(),
    dni: schema.number.optional([rules.range(8, 8)]),
    cuil: schema.number.optional([rules.range(11, 11)]),
    address: schema.string.optional(),
  }

  public create = schema.create({
    ...this.base,
    firstName: schema.string(),
    lastName: schema.string(),
  })

  public modify = schema.create({
    ...this.base,
    firstName: schema.string.optional(),
    lastName: schema.string.optional(),
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
