import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import { create, findAll, findOne, modify, remove } from 'App/Services/CRUDMethod'
import { STUDENT_ID } from 'App/Utils/constants'
import StudentValidator from 'App/Validators/StudentValidator'

export default class StudentsController {
  public async index(ctx: HttpContextContract) {
    await findAll(Student, ctx)
  }

  public async store(ctx: HttpContextContract) {
    await create(Student, ctx, StudentValidator)
  }

  public async show(ctx: HttpContextContract) {
    await findOne(Student, ctx, STUDENT_ID)
  }

  public async update(ctx: HttpContextContract) {
    await modify(Student, ctx, StudentValidator, STUDENT_ID)
  }

  public async destroy(ctx: HttpContextContract) {
    await remove(Student, ctx, STUDENT_ID)
  }
}
