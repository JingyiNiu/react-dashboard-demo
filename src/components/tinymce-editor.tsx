import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMceEditor = ({ editorData, onChange }: any) => {
    const tinemceApiKey = process.env.REACT_APP_TINYMCE_API_KEY;

    const editorRef = useRef<any>(null);

    return (
        <>
            <Editor
                apiKey={tinemceApiKey}
                onInit={(evt: any, editor: any) => (editorRef.current = editor)}
                initialValue={editorData}
                onEditorChange={() => onChange(editorRef.current.getContent())}
                init={{
                    height: 500,
                    menubar: 'insert',
                    plugins:
                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
                    toolbar:
                        'undo redo | fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap code | removeformat | addcomment showcomments | spellcheckdialog a11ycheck typography ',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    image_advtab: true,
                    paste_data_images: true,
                    file_picker_types: 'file image media',
                }}
            />
        </>
    );
};

export default TinyMceEditor;
