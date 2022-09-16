import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Documentation extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: 'studentId' })
  public studentId: number

  @column({ serializeAs: 'birthCertificate' })
  public birthCertificate: boolean

  @column({ serializeAs: 'seventhGradeCertificate' })
  public seventhGradeCertificate: boolean

  @column({ serializeAs: 'studentDni' })
  public studentDni: boolean

  @column({ serializeAs: 'studentCuil' })
  public studentCuil: boolean

  @column({ serializeAs: 'tutorDni' })
  public tutorDni: boolean

  @column({ serializeAs: 'tutorCuil' })
  public tutorCuil: boolean

  @column({ serializeAs: 'vaccinationCard' })
  public vaccinationCard: boolean

  @column({ serializeAs: 'studentDomicileCertificate' })
  public studentDomicileCertificate: boolean

  @column({ serializeAs: 'tutorDomicileCertificate' })
  public tutorDomicileCertificate: boolean

  @column({ serializeAs: 'registrationRequest' })
  public registrationRequest: boolean

  @column({ serializeAs: 'physicalAptitude' })
  public physicalAptitude: boolean

  @column()
  public dental: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
