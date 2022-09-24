import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationValidator from 'App/Validators/AuthenticationValidator'

export default class AuthenticationController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(AuthenticationValidator)

    const token = await auth.use('api').attempt(email, password)

    response.ok(token)
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    response.ok(null)
  }
}
