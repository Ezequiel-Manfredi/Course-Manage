import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'courseId' })
  public courseId: number

  @column()
  public record: object

  @column.dateTime({ serialize: (value: DateTime) => value.toFormat('yyyy-MM-dd') })
  public date: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
