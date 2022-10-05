import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthenticationValidator from 'App/Validators/AuthenticationValidator'

export default class AuthenticationController {
  public async login({ auth, request, response }: HttpContextContract): Promise<void> {
    const { email, password } = await request.validate(AuthenticationValidator)

    const token = await auth.use('api').attempt(email, password)
    const user = auth.user!
    await user.load('preceptor')

    response.ok({ ...token.toJSON(), user })
  }

  public async logout({ auth, response }: HttpContextContract): Promise<void> {
    await auth.use('api').revoke()

    response.ok(null)
  }
}
