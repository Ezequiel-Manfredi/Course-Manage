import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tutors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('middle_name')
      table.string('last_name').notNullable()
      table.string('full_name').notNullable()
      table.integer('dni')
      table.integer('cuil')
      table.string('address')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
