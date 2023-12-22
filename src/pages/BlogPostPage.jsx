import BlogPost from "../components/BlogPost";
import Sidebar from "../components/SideBar";

const BlogPostPage = ({ selectedPreviewUrl, setKey }) => {
    console.log(selectedPreviewUrl)
    return (
        <>
            <Sidebar setKey={setKey} />
            <BlogPost />
        </>
    )
}

export default BlogPostPage;