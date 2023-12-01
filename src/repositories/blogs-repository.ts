import {BlogCreateModel, BlogUpdateModel} from "../types/blogs/input";
import {blogsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {OutputBlogType} from "../types/blogs/output";
import {blogMapper} from "../types/blogs/mapper";

export class BlogsRepository{
    static async getAllBlogs() {
        const blogs = await blogsCollection.find({}).toArray()

        return blogs.map(blogMapper)
    }

    static async getBlogById(id: string): Promise<OutputBlogType | null> {
        try {
            const blog = await blogsCollection.findOne({_id: new ObjectId(id)})

            if (!blog) {
                return null
            }

            return blogMapper(blog)
        } catch {
            return null
        }
    }
    static async createBlog(blog: BlogCreateModel) {
        const createdAt = new Date().toISOString()
        const newBlog = {
            ...blog,
            id: new ObjectId().toString(),
            createdAt: createdAt,
            isMembership: false
        }

        const result = await blogsCollection.insertOne(newBlog)
        await blogsCollection.updateOne({id: newBlog.id}, {
            $set: {
                id: result.insertedId
            }
        })
        return result.insertedId
    }

    static async updateBlog(id: string, updateData: BlogUpdateModel): Promise<boolean> {
        try {
            const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl
                }
            })

            return !!result.matchedCount
        }
        catch {
            return false
        }
        }

    static async deleteBlog(id:string): Promise<boolean> {
        try {
            const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})

            return !!result.deletedCount
        } catch {
            return false
        }
    }

}