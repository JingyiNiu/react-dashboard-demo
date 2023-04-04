import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axiosClient from '../axios.config';
import { IMAGE_PREFIX } from '../utils/utils';
import { color_preset } from '../utils/tinymce';

const TinyMceEditor = ({ editorData, onChange }: any) => {
    const tinemceApiKey = process.env.REACT_APP_TINYMCE_API_KEY;

    const editorRef = useRef<any>(null);

    function uploadImage(blobInfo: any, success: any, failure: any, progress: any) {
        const API_END_POINT = '/api/admin/image';

        const formData = new FormData();
        formData.append('image', blobInfo.blob(), blobInfo.filename());

        axiosClient
            .post(API_END_POINT, formData)
            .then((res) => {
                success(IMAGE_PREFIX + res.data.data.url);
            })
            .catch((err) => {
                failure(err.message);
            });
    }

    return (
        <>
            <Editor
                apiKey={tinemceApiKey}
                onInit={(evt: any, editor: any) => (editorRef.current = editor)}
                initialValue={editorData}
                onEditorChange={() => onChange(editorRef.current.getContent())}
                init={{
                    height: 800,
                    plugins: [
                        'link image media table code codesample emoticons ',
                        'charmap checklist lists advlist wordcount textcolor spellchecker help ',
                    ],
                    toolbar:
                        'undo redo | bold italic underline strikethrough | ' +
                        'link image media table | codesample emoticons charmap code | ' +
                        'forecolor backcolor | removeformat | align lineheight | ' +
                        'checklist numlist bullist indent outdent | ' +
                        'formatselect fontselect fontsizeselect | spellchecker help',
                    image_advtab: true,
                    paste_data_images: true,
                    file_picker_types: 'file image media',
                    images_upload_handler: uploadImage,
                    color_map: color_preset,
                }}
            />
        </>
    );
};

export default TinyMceEditor;
