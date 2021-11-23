import react, { FC, InputHTMLAttributes } from 'react';
import classnames from 'classnames';

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    error: string,
    
}

const InputGroup: FC<InputGroupProps> = ({ name, label, error, onChange }) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type="text"
                onChange={onChange}
                className={classnames("form-control", { "is-invalid": !!error })}
                id={name}
                name={name} />
            {!!error && <div id="validationServer03Feedback" className="invalid-feedback">
                Please provide a valid city.
            </div>
            }
        </div>
    );
}

export default InputGroup;