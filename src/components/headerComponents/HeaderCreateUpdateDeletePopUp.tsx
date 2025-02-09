import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BlogService} from "../../services/BlogService";
import {Blog, GetBlogResponse} from "../../model/GetBlogReponse";

interface HeaderCreatePopUpProps {
    isDelete: boolean;
    formDataForUpdate: Blog;
    handleClosePopup: () => void;
}

const HeaderCreateUpdateDeletePopUp = ({ isDelete, formDataForUpdate, handleClosePopup}: HeaderCreatePopUpProps) => {
    const blogService = new BlogService();

    const [formData, setFormData] = useState<Blog>({
        blogId: formDataForUpdate?.blogId,
        title: formDataForUpdate?.title ?? '',
        description: formDataForUpdate?.description ?? '',
        author: { firstName: formDataForUpdate?.author?.firstName ?? '',
            lastName: formDataForUpdate?.author?.lastName ?? '',
            authorId: formDataForUpdate?.author?.authorId},
        fullBlogText: formDataForUpdate?.fullBlogText ?? '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'firstName' || name === 'lastName') {
            setFormData((prevData) => ({
                ...prevData,
                author: {
                    ...prevData.author,
                    [name]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    function isFormDataValid(formData: Blog): boolean {
        let isValid = true;
        if (formData.title === "") {
            isValid = false;
        } else if (formData.author.firstName === "") {
            isValid = false;
        } else if (formData.author.lastName  === "") {
            isValid = false;
        } else if (formData.fullBlogText === "") {
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormDataValid(formData)) {
            if (isDelete) {
                blogService.deleteBlog(formData.blogId).then(() => handleClosePopup());
            } else if (formDataForUpdate) {
                blogService.updateBlog(formData).then(() => handleClosePopup());
            } else {
                blogService.createBlog(formData).then(() => handleClosePopup());
            }
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        disabled={isDelete}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={isDelete}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.author.firstName}
                        onChange={handleChange}
                        required
                        disabled={isDelete}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.author.lastName}
                        onChange={handleChange}
                        required
                        disabled={isDelete}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fullWriting" className="form-label">Full Writing</label>
                    <textarea
                        className="form-control"
                        id="fullWriting"
                        name="fullBlogText"
                        rows={5}
                        value={formData.fullBlogText}
                        onChange={handleChange}
                        required
                        disabled={isDelete}
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        {formDataForUpdate
                            ? (isDelete ? "Delete blog" : "Update blog")
                            : "Create blog"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HeaderCreateUpdateDeletePopUp;
