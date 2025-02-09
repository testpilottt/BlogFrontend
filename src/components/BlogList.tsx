import { useState, useEffect } from 'react';
import {Card, Pagination, Row, Col, Button, Modal} from 'react-bootstrap';
import { BlogService } from '../services/BlogService';
import HeaderCreateUpdateDeletePopUp from "./headerComponents/HeaderCreateUpdateDeletePopUp";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import {Blog} from "../model/GetBlogReponse";

interface BlogListProps {
    triggerGetBlogs: boolean;
}

const BlogList = ({ triggerGetBlogs }: BlogListProps) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const blogService = new BlogService();

    //Update or Delete
    const [showPopup, setShowPopup] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(undefined);
    const handleClose = () => {
        fetchBlogs(0);
        setShowPopup(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs(page);
    }, [page]);

    useEffect(() => {
        fetchBlogs(0);
    }, [triggerGetBlogs]);

    const fetchBlogs = (pageNumber: number) => {
        setLoading(true);
        blogService.getBlogs(pageNumber).then(result => {
            if (!result) {
                return;
            }

            setTotalPages(result.totalPages);
            setBlogs(result.content);
            setLoading(false);
        });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{isDelete ? "Delete Blog" : "Update Blog"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <HeaderCreateUpdateDeletePopUp
                                isDelete={isDelete}
                                formDataForUpdate={selectedBlog}
                                handleClosePopup={() => handleClose()}
                            />
                        </Modal.Body>
                    </Modal>
                    <Row>
                        {blogs.map(blog => (
                            <Col key={blog.blogId} md={4} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title><strong>Title:</strong> {blog.title}</Card.Title>
                                        <Card.Text><strong>Description:</strong> {blog.description}</Card.Text>
                                        <Card.Footer className="text-muted d-flex justify-content-between">
                                            <strong>Author Name:</strong> {blog.author.firstName} {blog.author.lastName}
                                                <div>
                                                    <Button variant="success" onClick={() => {
                                                        navigate("/blog/" + blog.blogId, { state: { blogData: blog } });
                                                    }}>
                                                        View Blog
                                                    </Button>
                                                    <Button variant="warning" onClick={() => {
                                                        setSelectedBlog(blog);
                                                        setIsDelete(false);
                                                        setShowPopup(true);
                                                    }}>
                                                        Update
                                                    </Button>
                                                    <Button variant="danger" onClick={() => {
                                                        setSelectedBlog(blog);
                                                        setIsDelete(true);
                                                        setShowPopup(true);
                                                    }}>
                                                        Delete
                                                    </Button>
                                                </div>
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div className="d-flex justify-content-center my-4">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 0}
                            />
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index === page}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages - 1}
                            />
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogList;