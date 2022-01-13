import { FC, useRef } from "react";
import classNames from "classnames";
import { Editor, IAllProps } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import { config } from './editorConfig';


interface EditorProps extends IAllProps {
  label: string;
  field: string;
  touched?: boolean | null;
  error?: string | null;
 
}

const EditorTiny: FC<EditorProps> = ({
  label,
  touched = null,
  error = null,
  field,
  ...props
}: EditorProps) => {
  const editorRef = useRef<any>(null);
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <div
        className={classNames(
          "form-control",
          { "is-invalid border border-4 border-danger": touched && error },
          { "is-valid border border-4 border-success": touched && !error }
        )}
      >
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="0cfezdolqdov3xo5xialtzlr1smirffuedrc29adhinqiy3l"
          init={config}
          {...props}
        />
      </div>

      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default EditorTiny;
