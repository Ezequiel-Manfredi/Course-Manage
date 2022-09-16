import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'documentations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('student_id').unsigned().references('students.id').onDelete('CASCADE')
      table.boolean('birth_certificate').defaultTo(false)
      table.boolean('seventh_grade_certificate').defaultTo(false)
      table.boolean('student_dni').defaultTo(false)
      table.boolean('student_cuil').defaultTo(false)
      table.boolean('tutor_dni').defaultTo(false)
      table.boolean('tutor_cuil').defaultTo(false)
      table.boolean('vaccination_card').defaultTo(false)
      table.boolean('student_domicile_certificate').defaultTo(false)
      table.boolean('tutor_domicile_certificate').defaultTo(false)
      table.boolean('registration_request').defaultTo(false)
      table.boolean('physical_aptitude').defaultTo(false)
      table.boolean('dental').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
