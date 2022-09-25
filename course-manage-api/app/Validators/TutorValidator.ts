import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CUIL_REGEX, DNI_REGEX } from 'App/Utils/constants'

export default class TutorValidator {
  constructor(protected ctx: HttpContextContract) {
    const method = ctx.request.method()

    this.schema = this.options[method]
  }

  public schema: any

  private base = {
    middleName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
    dni: schema.string.optional([rules.regex(DNI_REGEX)]),
    cuil: schema.string.optional([rules.regex(CUIL_REGEX)]),
    address: schema.string.optional(),
  }

  public create = schema.create({
    ...this.base,
    firstName: schema.string([rules.alpha({ allow: ['space'] })]),
    lastName: schema.string([rules.alpha({ allow: ['space'] })]),
  })

  public modify = schema.create({
    ...this.base,
    firstName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
    lastName: schema.string.optional([rules.alpha({ allow: ['space'] })]),
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
