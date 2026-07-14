import React, { useState } from "react";
import RichTextEditor from "../components/RichTextEditor.jsx";

const CreatePost = () => {
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        console.log("HTML Content:", content);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>

            <RichTextEditor content={content} setContent={setContent} />

            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                Submit Post
            </button>
        </div>
    );
};

export default CreatePost;