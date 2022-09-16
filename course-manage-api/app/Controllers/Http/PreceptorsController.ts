import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Preceptor from 'App/Models/Preceptor'
import { create, findAll, findOne, modify, remove } from 'App/Services/CRUDMethod'
import { PRECEPTOR_ID } from 'App/Utils/constants'
import PreceptorValidator from 'App/Validators/PreceptorValidator'

export default class PreceptorsController {
  public async index(ctx: HttpContextContract) {
    await findAll(Preceptor, ctx)
  }

  public async store(ctx: HttpContextContract) {
    await create(Preceptor, ctx, PreceptorValidator)
  }

  public async show(ctx: HttpContextContract) {
    await findOne(Preceptor, ctx, PRECEPTOR_ID)
  }

  public async update(ctx: HttpContextContract) {
    await modify(Preceptor, ctx, PreceptorValidator, PRECEPTOR_ID)
  }

  public async destroy(ctx: HttpContextContract) {
    await remove(Preceptor, ctx, PRECEPTOR_ID)
  }
}
