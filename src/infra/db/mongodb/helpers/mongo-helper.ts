import { MongoClient, Collection, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect() {
    await this.client.close()
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },
  map: ({ _id, ...collection }: any, mongoId: ObjectId): any => {
    return {
      id: mongoId.toHexString(),
      ...collection
    }
  }
}
