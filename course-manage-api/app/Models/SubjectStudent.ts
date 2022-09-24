import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubjectStudent extends BaseModel {
  public static table = 'subjects_students'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'firstQuarter' })
  public firstQuarter: string | null

  @column({ serializeAs: 'secondQuarter' })
  public secondQuarter: string | null

  @column()
  public december: string | null

  @column()
  public march: string | null

  @column()
  public passed: boolean

  @column()
  public annotations: string | null

  @column({ serializeAs: 'courseId' })
  public courseId: number

  @column({ serializeAs: 'studentId' })
  public studentId: number

  @column({ serializeAs: 'subjectId' })
  public subjectId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
