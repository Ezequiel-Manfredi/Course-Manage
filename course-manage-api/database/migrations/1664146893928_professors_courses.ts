import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'professors_courses'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('status').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
