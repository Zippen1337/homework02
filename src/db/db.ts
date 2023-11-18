import {BlogType} from "../types/blogs/output";
import {PostType} from "../types/posts/output";

type DBType = {
    blogs: BlogType[]
    posts: PostType[]
}
export const db: DBType = {
    blogs: [
        {
            id: '1',
            name: 'Alex',
            description: 'Funny description',
            websiteUrl: 'https://vk.com/'
        },
        {
            id: '2',
            name: 'John',
            description: 'Very funny description',
            websiteUrl: 'https://instagram.com/'
        },
    ],
    posts: [
        {
            id: '1',
            title: 'Good title',
            shortDescription: 'Funny post',
            content: 'some content',
            blogId: '123',
            blogName: 'Blog name'
        },
        {
            id: '2',
            title: 'Not good title',
            shortDescription: 'Very funny post',
            content: 'more content',
            blogId: '456',
            blogName: 'Blog surname'
        },
    ]
}