import PouchDb from 'pouchdb-browser'
import { Model } from './models/Model'

class Data {
  #locale = new PouchDb()

  public async add(model: Model) {
    try {
      const result = await this.#locale.put(model)
      return result.ok
    } catch (error) {
      return false
    }
  }

  public async get(id: string) {
    try {
      return await this.#locale.get(id) || null
    } catch (error) {
      return null
    }
  }
}

export const data = new Data()
