import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestValidatorNode, ParsedTypedSchema, TypedSchema } from '@ioc:Adonis/Core/Validator'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { DEFAULT_PAGE, DEFAULT_SIZE, DELETE_OBJECT } from 'App/Utils/constants'
import PaginationValidator from 'App/Validators/PaginationValidator'

export const findAll = async (model: typeof BaseModel, { request, response }: HttpContextContract) => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = await request.validate(PaginationValidator)

  const rows = await model.query().paginate(page, size)

  response.ok({ total: rows.total, results: rows.all() })
}

export const create = async (
  model: typeof BaseModel,
  { request, response }: HttpContextContract,
  validator: RequestValidatorNode<ParsedTypedSchema<TypedSchema>>
) => {
  const body = await request.validate(validator)

  const row = await model.create(body)

  response.created(row)
}

export const findOne = async (
  model: typeof BaseModel,
  { request, response }: HttpContextContract,
  idName: string
) => {
  const id: number = request.param(idName)

  const row = await model.findOrFail(id)

  response.ok(row)
}

export const modify = async (
  model: typeof BaseModel,
  { request, response }: HttpContextContract,
  validator: RequestValidatorNode<ParsedTypedSchema<TypedSchema>>,
  idName: string
) => {
  const id: number = request.param(idName)
  const body = await request.validate(validator)

  const row = await model.findOrFail(id)
  await row.merge(body).save()

  response.ok(row)
}

export const remove = async (
  model: typeof BaseModel,
  { request, response }: HttpContextContract,
  idName: string
) => {
  const id: number = request.param(idName)

  const row = await model.findOrFail(id)
  await row.merge(DELETE_OBJECT).save()

  response.ok(null)
}
