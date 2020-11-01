import PouchDb from 'pouchdb-browser'
import { Model } from './models/Model'
import indexedDb from 'pouchdb-adapter-indexeddb'
import { DataType } from './DataType.enum'

PouchDb.plugin(indexedDb)

interface GetAllParams {
  prefix?: string
  includeDocs?: boolean
  includeAttachments?: boolean
}

class Data {
  private locale = new PouchDb('local-db', {
    adapter: 'indexeddb'
  })

  public async add<DT extends DataType>(model: Model<DT>): Promise<boolean> {
    try {
      const result = await this.locale.put(model)
      return result.ok
    } catch {
      return false
    }
  }

  public async remove(id: string): Promise<boolean> {
    try {
      const doc = await this.get(id)
      if (!doc) {
        return false
      }
      const { ok } = await this.locale.put({
        ...doc,
        _deleted: true
      })
      return ok
    } catch {
      return false
    }
  }

  public async get<DT extends DataType, T extends Model<DT>>(
    id: string
  ): Promise<T | null> {
    try {
      return ((await this.locale.get(id)) as T) || null
    } catch {
      return null
    }
  }

  public async getAll<DT extends DataType, T extends Model<DT>>({
    prefix,
    includeDocs = true,
    includeAttachments = false
  }: GetAllParams): Promise<T[]> {
    const response = await this.locale.allDocs({
      include_docs: includeDocs,
      attachments: includeAttachments,
      startkey: prefix ? prefix : undefined,
      endkey: prefix ? `${prefix}\ufff0` : undefined
    })

    return response.rows.map((row) => row.doc) as T[]
  }
}

export const data = new Data()
