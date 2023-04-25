import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const Test = () => {
    const tinemceApiKey = "YOUR API KEY";
    const [content, setContent] = useState('');

    const handleEditorChange = (content: string, editor: any) => {
        setContent(content);
      };

    const handleSubmit = () => {
        console.log(content);
    };
    return (
        <>
            <Editor
                apiKey={tinemceApiKey}
                initialValue=""
                onEditorChange={handleEditorChange}
                init={{
                    height: 300,
                    plugins: [
                        'link image media table code codesample emoticons ',
                        'charmap lists advlist wordcount help ',
                    ],
                    toolbar:
                        'undo redo | bold italic underline strikethrough | ' +
                        'link image media table | codesample emoticons charmap code | ' +
                        'forecolor backcolor | removeformat | align lineheight | ' +
                        'numlist bullist indent outdent | ' +
                        'formatselect fontselect fontsizeselect | help',
                    image_advtab: true,
                    paste_data_images: true,
                    file_picker_types: 'file image media',
                }}
            />
            <button onClick={handleSubmit}>submit</button>
        </>
    );
};

export default Test;
