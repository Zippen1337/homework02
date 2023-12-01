import {blogsCollection,postsCollection} from "../db/db";

export class TestingRepository {
    static async deleteAllData() {
        await blogsCollection.deleteMany({})
        await postsCollection.deleteMany({})
    }
}