import { FC, InputHTMLAttributes } from "react";
import classnames from "classnames";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
  value?: string;
}

const InputGroup: FC<InputGroupProps> = ({
  name,
  label,
  type = "text",
  error,
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
          "is-invalid": !!error,
          "is-valid": error === "",
        })}
        id={name}
        name={name}
      />
      {!!error && (
        <div id="validationServer03Feedback" className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputGroup;

