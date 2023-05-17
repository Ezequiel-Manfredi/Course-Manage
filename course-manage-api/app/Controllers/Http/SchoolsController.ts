import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import School from 'App/Models/School'
import { SCHOOL_ID } from 'App/Utils/constants'
import { QuerySchoolValidator, SchoolValidator } from 'App/Validators/SchoolValidator'
import CrudController from './CrudController'

export default class SchoolsController extends CrudController {
  constructor() {
    super(SCHOOL_ID, School, SchoolValidator)
  }

  public async index(ctx: HttpContextContract) {
    const validator = new QuerySchoolValidator(ctx)
    await validator.validate()
    const { search = '' } = validator.data

    await super.index(ctx, (query) => {
      query.whereLike('name', `%${search}%`).orderBy('name', 'asc').limit(5)
    })
  }
}
