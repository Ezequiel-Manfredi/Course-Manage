import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import { COURSE_ID } from 'App/Utils/constants'
import CourseValidator from 'App/Validators/CourseValidator'
import CrudController from './CrudController'

export default class CoursesController extends CrudController {
  constructor() {
    super(COURSE_ID, Course, CourseValidator)
  }

  public async show({ request, response }: HttpContextContract): Promise<void> {
    const id: number = request.param(this.idName)

    const row = await Course.query().where('id', id).withCount('professors').firstOrFail()

    response.ok(row)
  }
}
