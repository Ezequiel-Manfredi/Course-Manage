import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'professors_courses'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('subject_id').unique()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
