import {db} from "../db/db";
import {BlogCreateModel, BlogUpdateModel} from "../types/blogs/input";

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

    static UpdateBlogById(id: string, blog: BlogUpdateModel) {
        const foundBlogIndex = db.blogs.findIndex(b => b.id === id)
        if (foundBlogIndex === -1) {
            return
        }
        const foundBlog = db.blogs[foundBlogIndex]

        db.blogs[foundBlogIndex] = {
            id: foundBlog.id,
            ...blog
        }
        return
    }

    static DeleteBlogById(id:string) {
        const foundBlogIndex  = db.blogs.findIndex(b => b.id === id)
        if (foundBlogIndex === -1 ) {
            return
        }
        db.blogs.splice(foundBlogIndex,1)
        return
    }

}