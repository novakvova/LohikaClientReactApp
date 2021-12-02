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
          // "is-invalid": !errors,
          // "is-valid": errors,
        })}
        id={name}
        name={name}
      />

      {errors &&
        errors.map((message, key) => (
          <span
          className="text-danger"
            key={key}
            // id="validationServer03Feedback"
            // className="invalid-feedback"
          >
            {message}
          </span>
        ))}
    </div>
  );
};

export default InputGroup;

