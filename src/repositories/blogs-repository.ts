import {db} from "../db/db";
import {BlogCreateModel} from "../types/blogs/input";

export class BlogsRepository{
    static getAllBlogs() {
        return db.blogs
    }

    static getBlogById(id: string) {
        const blog = db.blogs.find(b => b.id === id)
        if (!blog) {
            return null
        }
        return blog
    }
    static CreateNewBlog(blog: BlogCreateModel) {
        const newBlog = {
            id: (+(new Date())).toString(),
            ...blog
        }

        db.blogs.push(newBlog)
        return newBlog
    }

    static UpdateBlogById(id: string, blog: BlogCreateModel) {
        const foundBlog  = db.blogs.find(b => b.id === id)
        const foundBlogIndex  = db.blogs.findIndex(b => b.id === id)
        const updatedBlog = {
            // @ts-ignore
            id: foundBlog.id,
            ...blog
        }
        db.blogs[foundBlogIndex] = updatedBlog
    return updatedBlog
    }

    static DeleteBlogById(id:string) {
        const foundBlogIndex  = db.blogs.findIndex(b => b.id === id)
        db.blogs.splice(foundBlogIndex,1)
    }
}