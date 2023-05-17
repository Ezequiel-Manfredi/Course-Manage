import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Course from 'App/Models/Course'
import { COURSE_ID, DEFAULT_PAGE, DEFAULT_SIZE, Gender } from 'App/Utils/constants'
import { CourseValidator, QueryCourseValidator } from 'App/Validators/CourseValidator'
import CrudController from './CrudController'

export default class CoursesController extends CrudController {
  constructor() {
    super(COURSE_ID, Course, CourseValidator)
  }

  public async index(ctx: HttpContextContract) {
    await ctx.auth.user!.load('preceptor')
    const validator = new QueryCourseValidator(ctx)
    await validator.validate()

    const { school, page = DEFAULT_PAGE, size = DEFAULT_SIZE } = validator.data
    const {
      preceptor: { id },
    } = ctx.auth.user!

    await super.index(ctx, (query: ModelQueryBuilderContract<typeof Course>) => {
      query
        .where('preceptor_id', id)
        .andWhere('school_id', school)
        .orderBy('created_at', 'asc')
        .paginate(page, size)
    })
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
