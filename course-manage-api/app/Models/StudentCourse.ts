import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StudentCourse extends BaseModel {
  public static table = 'students_courses'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'absenceCount' })
  public absenceCount: number

  @column({ serializeAs: 'attendanceCount' })
  public attendanceCount: number

  @column({ serializeAs: 'classCount' })
  public classCount: number

  @column({ serializeAs: 'studentId' })
  public studentId: number

  @column({ serializeAs: 'courseId' })
  public courseId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
