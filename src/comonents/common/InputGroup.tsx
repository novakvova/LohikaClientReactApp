import { FC, InputHTMLAttributes } from "react";
import classNames from 'classnames';

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  field: string,
  touched?: boolean | null,
  error?: string | null,
  type?: "text"|"email"|"password"| "file" ,
  value? : string 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const InputGroup: FC<InputGroupProps> = ({label, field, onChange, touched=null, error=null, type="text", value}: InputGroupProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={field}
        className={classNames("form-control",
          {"is-invalid": touched && error},
          {"is-valid": touched && !error}
        )}
        id={field}
        onChange={onChange}
        value={value}
      />
      {(touched && error) && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputGroup;

