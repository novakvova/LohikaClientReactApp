import Cropper from "cropperjs";
import { LegacyRef, useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import classes from "./CropperMultiple.module.css";
import "cropperjs/dist/cropper.css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSync,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export interface IGetCropperProps {
  onChange: (id: number) => void;
  uploadImageHandler: (imageBase64: string) => any;
  onRemoveHandler?: (index: any) => void;
  onChangeImage?: (id: number, idx?: any) => void;
  field: string;
  value?: string;
  error?: string;
  touched?: boolean;
  message?: string;
  idx?: number;
}

const CropperMultiple: React.FC<IGetCropperProps> = ({
  onChange,
  field,
  error,
  touched,
  value,
  message,
  idx,
  uploadImageHandler,
  onRemoveHandler,
  onChangeImage,
}) => {
  const [img, setImg] = useState<string>(value as string);
  const [cropperObj, setCropperObj] = useState<Cropper>();
  const imgRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLDivElement>();
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
    e.target.value = "";
  };

  useEffect(() => {
    if (imgRef.current) {
      const cropper = new Cropper(imgRef.current as HTMLImageElement, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        preview: previewRef.current,
      });
      cropper.replace(img);
      setCropperObj(cropper);
    }
  }, [showModal, img]);

  const rotateImg = () => {
    if (imgRef.current) {
      cropperObj?.rotate(90);
    }
  };

  const getBase64 = async () => {
    try {
      const base = (await cropperObj?.getCroppedCanvas().toDataURL()) as string;
      setBase64(base);
      const data = await uploadImageHandler(base);
      onChange(data);
      if (onChangeImage) {
        onChangeImage(data, idx);
      }
      setShowModal(false);
    } catch (err) {
      console.log("err => ", err);
    }
  };

  return (
    <>
      <form className={classes.formGroup}>
        <label htmlFor={field} className={classes.cropperLabel}>
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
                {value && (
                  <img style={{ width: "100%" }} src={value} alt="asdasda" />
                )}
                {!value && (
                  <>
                    <i className="fa fa-image fa-5x"></i>
                    {message && <span className="d-block">{message}</span>}
                    {!message && <span className="d-block">Виберіть фото</span>}
                  </>
                )}
              </>
            )}
            {error && <div>{error}</div>}
          </div>
          <button
            type="button"
            onClick={() => {
              if (onRemoveHandler) {
                onRemoveHandler(idx);
                setBase64("");
              }
            }}
            className="btn btn-outline-secondary h-50 border-0"
          >
            <i className="fa fa-trash fa-2x"></i>
          </button>
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
            <div
              ref={previewRef as LegacyRef<HTMLDivElement>}
              style={{
                height: "150px",
                width: "150px",
                border: "1px solid silver",
                overflow: "hidden",
              }}
            ></div>
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

export default CropperMultiple;
