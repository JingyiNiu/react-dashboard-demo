import React from 'react';
import TinyMceEditor from '../../components/tinymce-editor';

const CreateArticlePage = () => {
    const handleEditorValueChange = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <div>CreateArticlePage</div>
            <TinyMceEditor onChange={handleEditorValueChange} />
        </>
    );
};

export default CreateArticlePage;
