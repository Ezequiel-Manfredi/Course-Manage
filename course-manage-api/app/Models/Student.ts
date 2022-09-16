import { DateTime } from 'luxon'
import { column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import { Gender } from 'App/Utils/constants'
import Tutor from './Tutor'
import Documentation from './Documentation'

export default class Student extends Person {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gender: Gender

  @column()
  public dni: number | null

  @column()
  public cuil: number | null

  @column()
  public address: string | null

  @column({ serializeAs: 'phoneNumber' })
  public phoneNumber: string | null

  @column.dateTime({
    serializeAs: 'birthdayDate',
    serialize: (value: DateTime) => value.toFormat('yyyy-MM-dd'),
  })
  public birthDate: DateTime

  @column({ serializeAs: 'fileNumber' })
  public fileNumber: number

  @column({ serializeAs: 'averageAbsence' })
  public averageAbsence: number

  @column()
  public annotations: string | null

  @manyToMany(() => Tutor, {
    pivotTable: 'tutors_students',
    localKey: 'id',
    pivotForeignKey: 'student_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tutor_id',
  })
  public tutors: ManyToMany<typeof Tutor>

  @hasOne(() => Documentation)
  public documentation: HasOne<typeof Documentation>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
