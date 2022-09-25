import { DateTime } from 'luxon'
import { column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import Student from './Student'

export default class Tutor extends Person {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dni: string | null

  @column()
  public cuil: string | null

  @column()
  public address: string | null

  @manyToMany(() => Student, {
    pivotTable: 'tutors_students',
    localKey: 'id',
    pivotForeignKey: 'tutor_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'student_id',
  })
  public children: ManyToMany<typeof Student>

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
