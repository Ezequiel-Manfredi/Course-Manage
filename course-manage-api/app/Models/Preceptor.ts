import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import User from './User'
import Course from './Course'

export default class Preceptor extends Person {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'userId' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Course)
  public courses: HasMany<typeof Course>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
