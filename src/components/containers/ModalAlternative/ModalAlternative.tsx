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
      {/* <!-- Modal content --> */}
      <div
        className={classes["modal-content"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className={classes.close}>&times;</span>
        {props.children}
        <p>Some text in the Modal..</p>
      </div>
    </BackDrop>
  );
};

export default ModalAlternative;
