import BlogPost from "../components/BlogPost";
import Sidebar from "../components/SideBar";

const BlogPostPage = ({ selectedPreviewUrl }) => {
    console.log(selectedPreviewUrl)
    return (
        <>
            <Sidebar />
            <BlogPost />
        </>
    )
}

export default BlogPostPage;