import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subjects_students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_quarter')
      table.string('second_quarter')
      table.string('december')
      table.string('march')
      table.boolean('passed').defaultTo(false)
      table.text('annotations')
      table.integer('student_id').unsigned().references('students.id').onDelete('CASCADE')
      table.integer('course_id').unsigned().references('courses.id').onDelete('CASCADE')
      table.integer('subject_id').unsigned().references('subjects.id').onDelete('CASCADE')
      table.unique(['student_id', 'course_id', 'subject_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
