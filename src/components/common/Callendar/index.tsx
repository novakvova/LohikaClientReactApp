import { FC } from "react";
import classNames from "classnames";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import uk from "date-fns/locale/uk"

interface DatePickerProps extends ReactDatePickerProps {
  label: string;
  field: string;
  touched?: boolean | null;
  error?: string | null;
  onChange(date: Date, event: React.SyntheticEvent<any> | undefined): void;
}

const Callendar: FC<DatePickerProps> = ({
  label,
  field,
  touched = null,
  error = null,
  onChange,
  ...props
}: DatePickerProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <DatePicker
        name={field}
        autoComplete="off"
        locale={uk}
        dateFormat="dd/MM/yyyy"
        className={classNames(
          "form-control",
          { "is-invalid": touched && error },
          { "is-valid": touched && !error }
        )}
        onChange={onChange}
        {...props}
      />
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Callendar;
