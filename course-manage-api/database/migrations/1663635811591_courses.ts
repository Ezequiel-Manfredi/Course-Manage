import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.integer('male_student_count').defaultTo(0)
      table.integer('female_student_count').defaultTo(0)
      table.integer('professor_count').defaultTo(0)
      table.integer('preceptor_id').unsigned().references('preceptors.id').onDelete('CASCADE')
      table.integer('school_id').unsigned().references('schools.id').onDelete('CASCADE')
      table.boolean('status').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
