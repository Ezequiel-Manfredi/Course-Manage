import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Gender } from 'App/Utils/constants'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('middle_name')
      table.string('last_name').notNullable()
      table.string('full_name').notNullable()
      table.enum('gender', Object.values(Gender)).defaultTo(Gender.none)
      table.integer('dni')
      table.integer('cuil')
      table.string('address')
      table.string('phone_number')
      table.timestamp('birth_date', { useTz: true }).notNullable()
      table.integer('file_number').notNullable()
      table.float('average_absence').defaultTo(0)
      table.text('annotations')
      table.boolean('status').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
