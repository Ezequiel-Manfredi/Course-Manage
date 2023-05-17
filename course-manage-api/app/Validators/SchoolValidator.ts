import { schema, rules, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class SchoolValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}

export class QuerySchoolValidator {
  constructor(protected ctx: HttpContextContract) {
    this.data = ctx.request.qs()
  }

  public data: { search?: string } = {}
  private schema = schema.create({
    search: schema.string.optional([rules.minLength(3)]),
  })

  public async validate() {
    await validator.validate({ data: this.data, schema: this.schema })
  }
}
