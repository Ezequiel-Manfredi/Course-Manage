import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'courseId' })
  public courseId: number

  @column()
  public record: { students: number[] }

  @column.dateTime({ serialize: (value: DateTime) => value.toFormat('yyyy-MM-dd') })
  public date: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeSave()
  public static verifyDate(attendace: Attendance) {
    if (!attendace.date) {
      attendace.date = DateTime.now()
    }
  }
}
