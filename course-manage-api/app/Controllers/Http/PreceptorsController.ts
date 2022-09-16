import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Preceptor from 'App/Models/Preceptor'
import { create, findAll, findOne, modify, remove } from 'App/Services/commonMethod'
import { PRECEPTOR_ID } from 'App/Utils/constants'
import PreceptorValidator from 'App/Validators/PreceptorValidator'

export default class PreceptorsController {
  public async index(ctx: HttpContextContract) {
    findAll(Preceptor, ctx)
  }

  public async store(ctx: HttpContextContract) {
    create(Preceptor, ctx, PreceptorValidator)
  }

  public async show(ctx: HttpContextContract) {
    findOne(Preceptor, ctx, PRECEPTOR_ID)
  }

  public async update(ctx: HttpContextContract) {
    modify(Preceptor, ctx, PreceptorValidator, PRECEPTOR_ID)
  }

  public async destroy(ctx: HttpContextContract) {
    remove(Preceptor, ctx, PRECEPTOR_ID)
  }
}
