import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import { COURSE_ID, Gender } from 'App/Utils/constants'
import CourseValidator from 'App/Validators/CourseValidator'
import CrudController from './CrudController'

export default class CoursesController extends CrudController {
  constructor() {
    super(COURSE_ID, Course, CourseValidator)
  }

  public async show({ request, response }: HttpContextContract): Promise<void> {
    const id: number = request.param(this.idName)

    const row = await Course.query()
      .where('id', id)
      .withCount('professors')
      .withCount('students', (query) => {
        query.where('gender', Gender.female).as('female_student_count')
      })
      .withCount('students', (query) => {
        query.where('gender', Gender.male).as('male_student_count')
      })
      .firstOrFail()

    response.ok(row)
  }
}
