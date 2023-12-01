import {PostCreateModel, PostUpdateModel} from "../types/posts/input";
import {blogsCollection, postsCollection} from "../db/db";
import {postMapper} from "../types/posts/mapper";
import {OutputPostType, PostType} from "../types/posts/output";
import {ObjectId} from "mongodb";



export class PostsRepository{
    static async getAllPosts() {
        const posts = await postsCollection.find({}).toArray()

        return posts.map(postMapper)
    }

    static async getPostById(id: string): Promise<OutputPostType | null> {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})

        if (!post) {
            return null
        }

        return postMapper(post)
    }

    static async createPost(post: PostCreateModel) {
       const createdAt = new Date().toISOString();
       const blog = await blogsCollection.findOne({_id: new ObjectId(post.blogId)})
        if (blog) {
            const newPost = {
                ...post,
                id: new ObjectId().toString(),
                blogName: blog.name,
                createdAt: createdAt
            }
            await postsCollection.insertOne(newPost)
            return newPost
        } else {
            return null
        }
    }

    static async updatePost(id: string, post: PostUpdateModel): Promise<Boolean> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(post.blogId)})

        const result = await postsCollection.updateOne({_id: new ObjectId(id)},
            {
                $set: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: blog!.name,
                }
            })
        return !!result.matchedCount;
    }

    static async DeletePostById(id: string) {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return !!result.deletedCount
    }

}


