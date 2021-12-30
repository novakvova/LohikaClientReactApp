import Cropper from "cropperjs";
import { LegacyRef, useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import classes from "./CropperComponent.module.css";
import carPhoto from "./auto_car-08.jpg";
import "cropperjs/dist/cropper.css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSync,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export interface IGetCropperProps {
  onChange: (field: string, value: string) => void;
  field: string;
  value?: string;
  error?: string;
  touched?: boolean;
}

const CropperComponent: React.FC<IGetCropperProps> = ({
  onChange,
  field,
  error,
  touched,
  value = carPhoto,
}) => {
  const [img, setImg] = useState<string>(carPhoto);
  const [cropperObj, setCropperObj] = useState<Cropper>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [base64, setBase64] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = async (e: any) => {
    const file = (e.target.files as FileList)[0];
    if (file) {
      const url = URL.createObjectURL(file);
      await setImg(url);
      cropperObj?.replace(url);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      const cropper = new Cropper(imgRef.current as HTMLImageElement, {
        aspectRatio: 16 / 9,
      });
      cropper.replace(img);
      setCropperObj(cropper);
    }
  }, [showModal]);

  const rotateImg = () => {
    if (imgRef.current) {
      cropperObj?.rotate(90);
    }
  };

  const getBase64 = () => {
    const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
    setBase64(base);
    setShowModal(false);
    onChange(field, base);
  };

  return (
    <>
      <form className={classes.formGroup}>
        <label htmlFor={field} style={{ height: "100%", width: "100%" }}>
          <div
            className={classNames(
              classes.labelInput,
              { "text-danger border border-danger rounded": touched && error },
              { "is-valid border border-success rounded": touched && !error }
            )}
          >
            {base64 && (
              <img className={classes.bgImg} src={base64} alt="asdas" />
            )}
            {!base64 && (
              <>
                {/* <img src={value} /> */}
                <i className="fa fa-image fa-5x"></i>
                <span className="d-block">Виберіть фото</span>
              </>
            )}
            {error && <div>{error}</div>}
          </div>
        </label>

        <input
          id={field}
          className="d-none"
          type="file"
          onChange={handleImageChange}
        />
      </form>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <div className={classes.modalBody}>
            <div className={classes.image}>
              {
                <img
                  ref={imgRef as LegacyRef<HTMLImageElement>}
                  src={value}
                  alt="asdds"
                />
              }
            </div>
            <div className="d-flex justify-content-around mt-2">
              <button
                onClick={rotateImg}
                type="button"
                className="btn btn-outline-secondary"
              >
                <FontAwesomeIcon icon={faSync} size={"2x"} />
              </button>
              <div
                className="d-flex justify-content-between"
                style={{ width: "150px" }}
              >
                <button
                  onClick={getBase64}
                  type="button"
                  className="btn btn-outline-success"
                >
                  <FontAwesomeIcon icon={faCheckCircle} size={"2x"} />
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  <FontAwesomeIcon icon={faTimesCircle} size={"2x"} />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CropperComponent;
