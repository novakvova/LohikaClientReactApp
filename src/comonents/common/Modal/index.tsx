import { useActions } from '../../../hooks/useActions';

interface Props {
  text: string;
  //click: (response: boolean) => void;
  id: number
}

const Modal: React.FC<Props> = ({ text, id }) => {
  const { deleteUser } = useActions();
  

return (
  <div className="addEmployee">
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {text}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {}}
            ></button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => console.log(id)}
            >
              Так
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {}}
            >
              Ні
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Modal;
