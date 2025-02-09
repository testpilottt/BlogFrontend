import { useState } from "react";
import Header from "./Header";
import BlogList from "./BlogList";

const MainPage = () => {
    const [triggerGetBlogs, setTriggerGetBlogs] = useState(false);

    const handleButtonGetClick = () => {
        setTriggerGetBlogs(!triggerGetBlogs);
    };

    return (
        <>
            <Header title={"Blog Post Manager"} hideButtonsAndEnableMainPageButton={false} triggerGetBlogs={handleButtonGetClick} ></Header>
            <BlogList triggerGetBlogs={triggerGetBlogs}></BlogList>
        </>
    );
};

export default MainPage;