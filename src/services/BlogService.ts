import axios from "axios";
import {Blog, GetBlogResponse} from "../model/GetBlogReponse";
import { ToastContainer, toast } from 'react-toastify';

export class BlogService {

    getBlogs(pageNumber: number): Promise<GetBlogResponse> {
        return axios.get<GetBlogResponse>('http://localhost:8080/blog/getBlogsByPagination/' + pageNumber, this.getHeader())
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching blogs:", error);
                toast("Error fetching blog! see logs in network tab");
                return null;
            });
    }

    createBlog(blogToCreate: Blog): Promise<GetBlogResponse> {
        return axios.post(
            'http://localhost:8080/blog/createBlog',
            this.buildCreateBlogRequest(blogToCreate),
            this.getHeader()
        ).then(response => response.data)
            .catch(error => {
                console.error("Error creating blog:", error);
                toast("Error creating blog! see logs in network tab");
                return null;
            });
    }

    updateBlog(blogToUpdate: Blog): Promise<GetBlogResponse> {
        let blogUpdateRequest: Blog = this.buildCreateBlogRequest(blogToUpdate);
        blogUpdateRequest.author.authorId = blogToUpdate.author.authorId;
        blogUpdateRequest.blogId = blogToUpdate.blogId;

        return axios.put(
            'http://localhost:8080/blog/updateBlog',
            blogUpdateRequest,
            this.getHeader()
        ).then(response => response.data)
            .catch(error => {
                console.error("Error updating blog:", error);
                toast("Error updating blog! see logs in network tab");
                return null;
            });
    }

    deleteBlog(blogToDelete: number): Promise<GetBlogResponse> {
        return axios.delete(
            'http://localhost:8080/blog/deleteBlog/' + blogToDelete,
            this.getHeader()
        ).then(response => response.data)
            .catch(error => {
                console.error("Error deleting blog:", error);
                toast("Error deleting blog! see logs in network tab");
                return null;
            });
    }


    getHeader() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic dXNlcmV4YW1wbGU6cGFzc3dvcmRleGFtcGxl'
            }
        }
    }

    buildCreateBlogRequest(blogtoCreate: Blog) {
        return {
            author: {
                firstName: blogtoCreate.author.firstName,
                lastName: blogtoCreate.author.lastName
            },
            title: blogtoCreate.title,
            description: blogtoCreate.description,
            fullBlogText: blogtoCreate.fullBlogText
        }
    }
}
