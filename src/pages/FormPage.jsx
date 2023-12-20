import BlogForm from "../components/Form";

const FormPage = ({ selectedPreviewUrl }) => {
    console.log(selectedPreviewUrl)
    return (
        <BlogForm selectedPreviewUrl={selectedPreviewUrl} />
    )
}

export default FormPage;