import { DataType } from '../DataType.enum'

export interface Model<DT extends DataType> {
  _id?: string
  _rev?: string
  _deleted?: boolean
  $type: DT
}
