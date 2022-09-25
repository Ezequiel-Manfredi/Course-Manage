import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tutors'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('dni').alter()
      table.string('cuil').alter()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
