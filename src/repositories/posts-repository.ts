import {PostCreateModel, PostUpdateModel} from "../types/posts/input";
import {blogsCollection, postsCollection} from "../db/db";
import {postMapper} from "../types/posts/mapper";
import {OutputPostType} from "../types/posts/output";
import {ObjectId} from "mongodb";



export class PostsRepository{
    static async getAllPosts() {
        const posts = await postsCollection.find({}).toArray()

        return posts.map(postMapper)
    }

    static async getPostById(id: string): Promise<OutputPostType | null> {
        try {
            const post = await postsCollection.findOne({_id: new ObjectId(id)})

            if (!post) {
                return null
            }

            return postMapper(post)
        } catch {
            return null
        }
    }

    static async createPost(post: PostCreateModel) {
        try {
            const createdAt = new Date().toISOString();
            const blog = await blogsCollection.findOne({_id: new ObjectId(post.blogId)})
            if (blog) {
                const newPost = {
                    ...post,
                    id: new ObjectId().toString(),
                    blogName: blog.name,
                    createdAt: createdAt
                }
                const result = await postsCollection.insertOne(newPost)
                await postsCollection.updateOne({id: newPost.id}, {
                    $set: {
                        id: result.insertedId
                    }
                })
                return result.insertedId
            } else {
                return null
            }
        } catch {
            return null
        }
    }

    static async updatePost(id: string, post: PostUpdateModel): Promise<Boolean> {
        try {
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
        } catch {
            return false
        }
    }

    static async DeletePostById(id: string) {
        try {
            const result = await postsCollection.deleteOne({_id: new ObjectId(id)})

            return !!result.deletedCount
        } catch {
            return false
        }
    }

}


