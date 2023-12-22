import BlogForm from "../components/Form";
import Sidebar from "../components/SideBar";

const FormPage = ({ selectedPreviewUrl, key, setKey }) => {
    console.log(selectedPreviewUrl)
    return (
        <>
            <Sidebar setKey={setKey} />
            <BlogForm selectedPreviewUrl={selectedPreviewUrl} key={key} setKey={setKey} />
        </>
    )
}

export default FormPage;