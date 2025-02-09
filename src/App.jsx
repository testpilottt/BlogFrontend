import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import BlogPage from "./components/BlogPage.tsx";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <div>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/blog/:id" element={<BlogPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
