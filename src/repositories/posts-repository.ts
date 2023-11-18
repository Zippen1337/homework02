import {db} from "../db/db";
import {PostCreateModel, PostUpdateModel} from "../types/posts/input";


export class PostsRepository{
    static GetAllPosts() {
        return db.posts
    }

    static GetPostById(id: string) {
        const post = db.posts.find(p => p.id === id)
        if (!post) {
            return null
        }
        return post
    }

    static CreateNewPost(post: PostCreateModel) {

        const blog = db.blogs.find(b => b.id === post.blogId)
        if (!blog) {
            return null
        }

        const newPost = {
            ...post,
            id: (+(new Date())).toString(),
            blogName: blog.name
        }

        db.posts.push(newPost)
        return newPost
    }

    static UpdatePostById(id: string, post: PostUpdateModel) {
        const foundPostIndex = db.posts.findIndex(p => p.id === id)
        const blog = db.blogs.find(b => b.id === post.blogId)
        if (!blog) {
            return
        }
        if (foundPostIndex === -1 ) {
            return
        }
        db.posts[foundPostIndex] = {
            ...post,
            id: (+(new Date())).toString(),
            blogName: blog.name
        }
        return
    }

    static DeletePostById(id: string) {
        const foundPostIndex = db.posts.findIndex(p => p.id === id)
        if (foundPostIndex === -1) {
            return
        }
        db.posts.splice(foundPostIndex,1)
        return
    }

}


