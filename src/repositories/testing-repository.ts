import {db} from "../db/db";

export class TestingRepository {
    static DeleteAllData() {
        db.blogs = []
        db.posts = []
    }
}