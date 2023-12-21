import BlogForm from "../components/Form";
import Sidebar from "../components/SideBar";

const FormPage = ({ selectedPreviewUrl }) => {
    console.log(selectedPreviewUrl)
    return (
        <>
            <Sidebar />
            <BlogForm selectedPreviewUrl={selectedPreviewUrl} />
        </>
    )
}

export default FormPage;