import {useState} from "react";
import Header from "./Header";
import {Blog} from "../model/GetBlogReponse";
import {useLocation} from "react-router-dom";
import CozyTextReader from "./CozyTextReader";


const BlogPage = () => {
    const location = useLocation();
    const blogData: Blog = location.state?.blogData;
    const [triggerGetBlogs, setTriggerGetBlogs] = useState(false);

    const handleButtonGetClick = () => {
        setTriggerGetBlogs(!triggerGetBlogs);
    };

    return (
        <>
            <Header title={"Happy blog reading! Written By " + blogData.author.firstName + " " + blogData.author.lastName}
                    hideButtonsAndEnableMainPageButton={true} triggerGetBlogs={handleButtonGetClick} ></Header>
            <CozyTextReader title={blogData.title} text={blogData.fullBlogText}></CozyTextReader>
        </>
    );
};

export default BlogPage;