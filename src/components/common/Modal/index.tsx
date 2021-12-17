import {useRef } from 'react';
import  * as bootstrap from "bootstrap";
import { Modal } from "bootstrap"
import { addFlashMessage, deleteFlashMessage } from '../../FleshMessages/actions';

interface Props {
  id: number,
  text: string,
  deleteFunc: (id:number) => number
}

const Modals: React.FC<Props> = ({ id, text, deleteFunc }) => {
  const modalRef = useRef(null);
  const modalSubmit = async () => {
    const response = await deleteFunc(id);
    const status = response;

    if (status === 404) {
      await addFlashMessage({
        type: "error",
        message: "Даного користувача не знайдено",
      });
    } else if (status === 200) {
      await addFlashMessage({
        type: "success",
        message: "Користувача видалено",
      });
    } else {
      await addFlashMessage({
        type: "error",
        message: "Щось пішло не так",
      });
    }
    hideModal();
    setTimeout(() => {
      deleteFlashMessage();
    }, 2000);
  };

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle as unknown as Element, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = bootstrap.Modal.getInstance(modalEle as unknown as Element);
    bsModal?.hide();
  };
  return (
    <div className="addEmployee">
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={showModal}
      >
        Видалити
      </button>
      <div className="modal fade" ref={modalRef} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {text}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={hideModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={modalSubmit}
              >
                Видалити
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={hideModal}
              >
                Відміна
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;
