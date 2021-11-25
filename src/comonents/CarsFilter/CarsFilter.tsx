import { FC, InputHTMLAttributes,MouseEventHandler } from "react";

// interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
//   onSortUp: () => {};
//   onSortDown: () => {};
// }

interface Props {
    onSortUp: MouseEventHandler
    onSortDown: MouseEventHandler
    onCLearFilter: MouseEventHandler
}

const CarsFilter : FC<Props> = ({ onSortUp, onSortDown, onCLearFilter }) => {
  return (
    <div className="row mb-2">
      <div className="col-3"></div>
      <button
        onClick={onSortDown}
        type="button"
        className="col-2 mx-1 btn btn-secondary btn-sm"
      >
        Від дешевих до дорогих
      </button>
      <button
        onClick={onSortUp}
        type="button"
        className="col-2 mx-1 btn btn-secondary btn-sm"
      >
        Від дорогих до дешевих
      </button>
      <button
        onClick={onCLearFilter}
        type="button"
        className="col-2 mx-1 btn btn-secondary btn-sm"
      >
        Очистити фільтр
      </button>
      <div className="col-3"></div>
    </div>
  );
};

export default CarsFilter;
