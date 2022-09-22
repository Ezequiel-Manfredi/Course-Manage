import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students_courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('absence_count').defaultTo(0)
      table.integer('attendance_count').defaultTo(0)
      table.integer('class_count').defaultTo(0)
      table.integer('student_id').unsigned().references('students.id')
      table.integer('course_id').unsigned().references('courses.id')
      table.unique(['student_id', 'course_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
