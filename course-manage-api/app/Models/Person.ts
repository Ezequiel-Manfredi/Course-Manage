import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Person extends BaseModel {
  @column({ serializeAs: 'firstName' })
  public firstName: string

  @column({ serializeAs: 'middleName' })
  public middleName: string | null

  @column({ serializeAs: 'lastName' })
  public lastName: string

  @column({ serializeAs: 'fullName' })
  public fullName: string

  @column()
  public status: boolean

  @beforeSave()
  public static formaterName(user: Person) {
    user.firstName = string.capitalCase(user.firstName.toLowerCase())
    user.lastName = string.capitalCase(user.lastName.toLowerCase())
    user.fullName = `${user.lastName}, ${user.firstName}`

    if (user.middleName) {
      user.middleName = string.capitalCase(user.middleName.toLowerCase())
      user.fullName += ` ${user.middleName}`
    }
  }
}
