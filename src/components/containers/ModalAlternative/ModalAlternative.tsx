import classes from "./ModalAlternative.module.css";

const BackDrop = (props: any) => {
  return (
    <div onClick={props.onClose} id="myModal" className={classes.modal}>
      {props.children}
    </div>
  );
};

const ModalAlternative = (props: any) => {
  return (
    <BackDrop onClose={props.onClose}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span
          className={classes.close}
          onClick={() => {
            props.onClose();
          }}
        >
          &times;
        </span>
        {props.children}
      </div>
    </BackDrop>
  );
};

export default ModalAlternative;
