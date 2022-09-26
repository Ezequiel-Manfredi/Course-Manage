import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProfessorCourse extends BaseModel {
  public static table = 'professors_courses'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'professorId' })
  public professorId: number

  @column({ serializeAs: 'courseId' })
  public courseId: number

  @column({ serializeAs: null })
  public subjectId: number

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
