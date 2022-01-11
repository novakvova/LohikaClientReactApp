import { Card } from 'primereact/card';
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = () => {
	const editorRef = useRef<any>(null);

 
	return (
    <>
      <Card>
        <h1 className="text-center">Добавити новину</h1>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          apiKey="0cfezdolqdov3xo5xialtzlr1smirffuedrc29adhinqiy3l"
          init={{
            height: 500,
            language: "uk",
            menubar: true,
            menu: {
              file: {
                title: "File",
                items: "newdocument restoredraft | preview | print ",
              },
              edit: {
                title: "Edit",
                items: "undo redo | cut copy paste | selectall | searchreplace",
              },
              view: {
                title: "View",
                items:
                  "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen",
              },
              insert: {
                title: "Insert",
                items:
                  "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
              },
              format: {
                title: "Format",
                items:
                  "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
              },
              tools: {
                title: "Tools",
                items: "spellchecker spellcheckerlanguage | code wordcount",
              },
              table: {
                title: "Table",
                items: "inserttable | cell row column | tableprops deletetable",
              },
              help: { title: "Help", items: "help" },
            },
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help imagetools wordcount",
            ],
            toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_langs: [
              { title: "English", code: "en" },
              { title: "Українська", code: "ua" },
            ],
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Card>
    </>
  );
};

export default TinyEditor;