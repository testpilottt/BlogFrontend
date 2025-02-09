import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Header.css";
import {GetBlogResponse} from "../model/GetBlogReponse";
import HeaderCreateUpdateDeletePopUp from "./headerComponents/HeaderCreateUpdateDeletePopUp";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    title: string;
    hideButtonsAndEnableMainPageButton: boolean;
    triggerGetBlogs: () => void;
}

const Header = ({ title, hideButtonsAndEnableMainPageButton, triggerGetBlogs }: HeaderProps) => {
    const [modalType, setModalType] = useState(null);
    const handleShow = (type) => setModalType(type);
    const handleClose = () => {
        triggerGetBlogs();
        setModalType(null);
    };
    const navigate = useNavigate();

    return (
        <>
            <header className="header-container d-flex justify-content-between align-items-center">
                <h1>{title}</h1>
                <div hidden={hideButtonsAndEnableMainPageButton}>
                    <Button variant="primary" className="mx-2" onClick={() => handleShow("createPopUp")}>Create</Button>
                    <Button variant="success" className="mx-2" onClick={() => handleShow("getPopUp")}>Get</Button>
                </div>
                <div hidden={!hideButtonsAndEnableMainPageButton}>
                    <Button variant="success" className="mx-2" onClick={() => navigate("/")}>Return to Main Page</Button>
                </div>
            </header>

            <Modal show={modalType !== null} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === "createPopUp" && "Create a New Blog Post"}
                        {modalType === "getPopUp" && "Retrieve Blog Posts"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === "createPopUp" && <HeaderCreateUpdateDeletePopUp isDelete={false} formDataForUpdate={undefined} handleClosePopup={handleClose}></HeaderCreateUpdateDeletePopUp>}
                    {modalType === "getPopUp" && <p>Click on "Get Blogs" to retrieve blogs.</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    {modalType === "getPopUp" && <Button variant="primary" onClick={() => {
                        handleClose();
                    }}>Get Blogs</Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Header;