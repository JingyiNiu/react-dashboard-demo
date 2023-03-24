import React from 'react';
import TinyMceEditor from '../../components/tinymce-editor';

const CreateArticlePage = () => {
    const handleEditorValueChange = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-8">Create New Article</h2>
            <TinyMceEditor onChange={handleEditorValueChange} />
        </>
    );
};

export default CreateArticlePage;
