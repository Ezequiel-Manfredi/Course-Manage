import { DateTime } from 'luxon'
import { column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Person from './Person'
import { Gender } from 'App/Utils/constants'
import Tutor from './Tutor'
import Documentation from './Documentation'
import Course from './Course'

export default class Student extends Person {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gender: Gender

  @column()
  public dni: string | null

  @column()
  public cuil: string | null

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

  @manyToMany(() => Course, {
    pivotTable: 'students_courses',
    localKey: 'id',
    pivotForeignKey: 'student_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'course_id',
    pivotColumns: ['absence_count', 'attendance_count', 'class_count'],
  })
  public courses: ManyToMany<typeof Course>

  @hasOne(() => Documentation)
  public documentation: HasOne<typeof Documentation>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  public serializeExtras() {
    const {
      pivot_absence_count: pivotAbsenceCount,
      pivot_attendance_count: pivotAttendanceCount,
      pivot_class_count: pivotClassCount,
    } = this.$extras

    if (pivotClassCount) {
      const average = (parseInt(pivotAbsenceCount) * 100) / parseInt(pivotClassCount)
      return {
        absenceCount: parseInt(pivotAbsenceCount) || 0,
        attendanceCount: parseInt(pivotAttendanceCount) || 0,
        classCount: parseInt(pivotClassCount) || 0,
        averageAbsence: parseFloat(average.toFixed(2)) || 0,
      }
    }
  }
}
