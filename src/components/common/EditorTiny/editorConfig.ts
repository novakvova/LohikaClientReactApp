
export const config = {
  height: 500,
  language: "uk",
  menubar: true,
  formats: {
    alignleft: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
    aligncenter: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
    alignright: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
    alignjustify: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
    bold: {inline : 'span', 'classes' : 'bold'},
    italic: {inline : 'span', 'classes' : 'italic'},
    underline: {inline : 'span', 'classes' : 'underline', exact : true},
    strikethrough: {inline : 'del'},
    forecolor: {inline : 'span', classes : 'forecolor', styles : {color : '%value'}},
    hilitecolor: {inline : 'span', classes : 'hilitecolor', styles : {backgroundColor : '%value'}},
    custom_format: {block : 'h1', attributes : {title : 'Header'}, styles : {color : 'red'}}
  },
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
    "advlist autolink lists link image imagetools charmap print preview anchor",
    "searchreplace visualblocks code fullscreen textcolor ",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor",
  content_langs: [
    { title: "English", code: "en" },
    { title: "Українська", code: "ua" },
  ],
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};