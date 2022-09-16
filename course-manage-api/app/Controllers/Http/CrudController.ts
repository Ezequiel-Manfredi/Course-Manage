import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestValidatorNode, ParsedTypedSchema, TypedSchema } from '@ioc:Adonis/Core/Validator'
import { BaseModel, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { DEFAULT_PAGE, DEFAULT_SIZE, DELETE_OBJECT } from 'App/Utils/constants'
import PaginationValidator from 'App/Validators/PaginationValidator'

export default class CrudController {
  public idName: string
  public model: typeof BaseModel
  public validator: RequestValidatorNode<ParsedTypedSchema<TypedSchema>>

  constructor(
    idName: string,
    model: typeof BaseModel,
    validator: RequestValidatorNode<ParsedTypedSchema<TypedSchema>>
  ) {
    this.idName = idName
    this.model = model
    this.validator = validator
  }

  public async index(
    { request, response }: HttpContextContract,
    callBack?: (query: ModelQueryBuilderContract<any>) => any
  ) {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = await request.validate(PaginationValidator)

    const rows = await this.model.query().orderBy('id', 'asc').if(callBack, callBack!).paginate(page, size)

    response.ok({ total: rows.total, results: rows.all() })
  }

  public async store({ request, response }: HttpContextContract): Promise<any> {
    const body = await request.validate(this.validator)

    const row = await this.model.create(body)

    response.created(row)
    return row
  }

  public async show({ request, response }: HttpContextContract) {
    const id: number = request.param(this.idName)

    const row = await this.model.findOrFail(id)

    response.ok(row)
  }

  public async update({ request, response }: HttpContextContract) {
    const id: number = request.param(this.idName)
    const body = await request.validate(this.validator)

    const row = await this.model.findOrFail(id)
    await row.merge(body).save()

    response.ok(row)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id: number = request.param(this.idName)

    const row = await this.model.findOrFail(id)
    await row.merge(DELETE_OBJECT).save()

    response.ok(null)
  }
}
