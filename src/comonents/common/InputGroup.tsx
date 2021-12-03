import { FC, InputHTMLAttributes } from "react";
import classnames from "classnames";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errors?: Array<string>;
  value?: string;
}

const InputGroup: FC<InputGroupProps> = ({
  name,
  label,
  type = "text",
  errors,
  onChange,
  value,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={classnames("form-control", {
          "is-invalid": Array.isArray(errors) && errors.length > 0,
          // "is-valid": errors,
        })}
        id={name}
        name={name}
      />

      {errors &&
        errors.map((message, key) => (
          <div className="text-danger" key={key}>
            {message}
          </div>
        ))}
    </div>
  );
};

export default InputGroup;

