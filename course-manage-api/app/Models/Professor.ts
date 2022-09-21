import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Subject from './Subject'
import Person from './Person'
import Course from './Course'

export default class Professor extends Person {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'subjectId' })
  public subjectId: number

  @belongsTo(() => Subject)
  public subject: BelongsTo<typeof Subject>

  @manyToMany(() => Course, {
    pivotTable: 'professors_courses',
    localKey: 'id',
    pivotForeignKey: 'professor_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'course_id',
  })
  public courses: ManyToMany<typeof Course>

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
