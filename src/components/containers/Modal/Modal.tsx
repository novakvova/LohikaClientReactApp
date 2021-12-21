
import classes from "./Modal.module.css";
import ReactDom from "react-dom";

const Backdrop = (props:any) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props:any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement: any = document.getElementById("overlays");

const Modal = (props:any) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
