import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Preceptor from './Preceptor'
import School from './School'
import Professor from './Professor'
import Student from './Student'
import Attendance from './Attendance'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: 'preceptorId' })
  public preceptorId: number

  @belongsTo(() => Preceptor)
  public preceptor: BelongsTo<typeof Preceptor>

  @column({ serializeAs: 'schoolId' })
  public schoolId: number

  @belongsTo(() => School)
  public school: BelongsTo<typeof School>

  @manyToMany(() => Professor, {
    pivotTable: 'professors_courses',
    localKey: 'id',
    pivotForeignKey: 'course_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'professor_id',
  })
  public professors: ManyToMany<typeof Professor>

  @manyToMany(() => Student, {
    pivotTable: 'students_courses',
    localKey: 'id',
    pivotForeignKey: 'course_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'student_id',
  })
  public students: ManyToMany<typeof Student>

  @hasMany(() => Attendance)
  public attendaces: HasMany<typeof Attendance>

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

  public serializeExtras() {
    const {
      pivot_absence_count: pivotAbsenceCount,
      pivot_attendance_count: pivotAttendanceCount,
      pivot_class_count: pivotClassCount,
      professors_count: professorsCount,
      female_student_count: femaleStudentCount,
      male_student_count: maleStudentCount,
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
    if (professorsCount || femaleStudentCount || maleStudentCount)
      return {
        professorsCount: parseInt(professorsCount) || 0,
        femaleStudentCount: parseInt(femaleStudentCount) || 0,
        maleStudentCount: parseInt(maleStudentCount) || 0,
      }
  }
}
