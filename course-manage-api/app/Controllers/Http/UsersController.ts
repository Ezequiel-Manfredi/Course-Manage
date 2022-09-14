import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { findAll } from 'App/Services/commonMethod'
import { DEFAULT_PAGE, DEFAULT_SIZE } from 'App/Utils/constants'
import PaginationValidator from 'App/Validators/PaginationValidator'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = await request.validate(PaginationValidator)

    const users = await findAll(User, page, size)

    response.ok({ total: users.total, results: users.all() })
  }

  public async store({ request, response }: HttpContextContract) {}

  public async show({ request, response }: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {}

  public async destroy({ request, response }: HttpContextContract) {}
}
