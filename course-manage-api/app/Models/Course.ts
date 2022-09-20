import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Preceptor from './Preceptor'
import School from './School'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: 'maleStudentCount' })
  public maleStudentCount: number

  @column({ serializeAs: 'femaleStudentCount' })
  public femaleStudentCount: number

  @column({ serializeAs: 'professorCount' })
  public professorCount: number

  @column({ serializeAs: 'preceptorId' })
  public preceptorId: number

  @belongsTo(() => Preceptor)
  public preceptor: BelongsTo<typeof Preceptor>

  @column({ serializeAs: 'schoolId' })
  public schoolId: number

  @belongsTo(() => School)
  public school: BelongsTo<typeof School>

  @column()
  public status: boolean

  @column.dateTime({
    autoCreate: true,
    serializeAs: 'createdAt',
    serialize: (value: DateTime) => value.toFormat('yyyy-MM-dd'),
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
