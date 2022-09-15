import { BaseModel, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export const findAll = async (
  model: typeof BaseModel,
  page: number,
  size: number
): Promise<ModelPaginatorContract<any>> => {
  return model.query().paginate(page, size)
}

export const modify = async (model: any, data: object) => {
  await model.merge(data).save()
}
