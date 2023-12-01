import {MongoClient} from 'mongodb'
import {BlogType} from "../types/blogs/output";
import {PostType} from "../types/posts/output";
import dotenv from 'dotenv';

dotenv.config()

export const port = 3000;

const mongoUri = "mongodb+srv://zippen1337:4rqvL77JnkmLopwX@homework.jthk7hj.mongodb.net/homework?retryWrites=true&w=majority"

const client = new MongoClient(mongoUri)

const db = client.db('homework')

export const blogsCollection = db.collection<BlogType>('blogs')
export const postsCollection = db.collection<PostType>('posts')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('client successfully connected to database')
        console.log(`listening on port ${port}`)
    }catch (e){
        console.log(`${e}`)
        await client.close()
    }
}