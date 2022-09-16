import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TutorStudent extends BaseModel {
  public static table = 'tutors_students'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'studentId' })
  public studentId: number
  @column({ serializeAs: 'tutorId' })
  public tutorId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
