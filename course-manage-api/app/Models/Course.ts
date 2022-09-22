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
    if (this.$extras.pivot_absence_count)
      return {
        absenceCount: parseInt(this.$extras.pivot_absence_count) || 0,
        attendanceCount: parseInt(this.$extras.pivot_attendance_count) || 0,
        classCount: parseInt(this.$extras.pivot_class_count) || 0,
        averageAbsence:
          (parseInt(this.$extras.pivot_absence_count) * 100) / parseInt(this.$extras.pivot_class_count) || 0,
      }
    if (this.$extras.professors_count || this.$extras.female_student_count || this.$extras.male_student_count)
      return {
        professorsCount: parseInt(this.$extras.professors_count) || 0,
        femaleStudentCount: parseInt(this.$extras.female_student_count) || 0,
        maleStudentCount: parseInt(this.$extras.male_student_count) || 0,
      }
  }
}
