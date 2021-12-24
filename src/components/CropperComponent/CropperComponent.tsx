import Cropper from "cropperjs";
import { useFormik } from "formik";
import { LegacyRef, useEffect, useRef, useState } from "react";
import Modal from "../containers/Modal/Modal";
import classes from "./CropperComponent.module.css";
import { ICropperImage } from "./types";
import carPhoto from "./auto_car-08.jpg";
import "cropperjs/dist/cropper.css";

export interface IGetCropperProps {
  onGetImgData: (img: string) => void;
  image?: string;
}

const CropperComponent: React.FC<IGetCropperProps> = ({ onGetImgData, image }) => {
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
      if (!showModal) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  };
  const onSubmit = (values: ICropperImage) => {};

  const initialValues: any = {
    image: img,
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnBlur: true,
  });

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
    const base = cropperObj?.getCroppedCanvas().toDataURL();
    setBase64(base);
    setShowModal(false);
    onGetImgData(base as string);
  };

  return (
    <>
      <form
        className={classes.formGroup}
        onSubmit={(e) => formik.handleSubmit(e)}
      >
        <label htmlFor="inputImg">
          <div className={classes.labelInput}>
            {base64 && (
              <img className={classes.bgImg} src={base64} alt="asdas" />
            )}
            {!base64 && (
              <>
                <i
                  className="fa fa-image fa-5x"
                  style={{ color: "silver" }}
                ></i>
                <span className="d-block">Виберіть фото</span>
              </>
            )}
          </div>
        </label>
        <input
          id="inputImg"
          className="d-none"
          type="file"
          onChange={handleImageChange}
        />
        <div className="text-center"></div>
      </form>
      {showModal && (
        <Modal>
          <div className={classes.modalBody}>
            <div className={classes.image}>
              {image && <img
                ref={imgRef as LegacyRef<HTMLImageElement>}
                src={image}
                alt="asdds"
              />}
              {!image &&<img
                ref={imgRef as LegacyRef<HTMLImageElement>}
                src={img}
                alt="asdds"
              />
              }
              
            </div>
            <button
              onClick={rotateImg}
              type="button"
              className="btn btn-primary"
            >
              Rotate
            </button>
            <button
              onClick={getBase64}
              type="button"
              className="btn btn-primary"
            >
              Завершити
            </button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              type="button"
              className="btn btn-primary"
            >
              Відмінити
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CropperComponent;
