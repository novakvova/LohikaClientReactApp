import Cropper from "cropperjs";
import { useFormik } from "formik";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import Modal from "../containers/Modal/Modal";
import classes from "./CropperComponent.module.css";
import { ICropperImage } from "./types";
import carPhoto from "./auto_car-08.jpg";
import "cropperjs/dist/cropper.css";

const CropperComponent: React.FC = () => {
  const [img, setImg] = useState<string>(carPhoto);
  const [cropperObj, setCropperObj] = useState<Cropper>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageChange = useCallback((e) => {
    const file = (e.target.files as FileList)[0];
    formik.setFieldValue("image", file);
    setImg(URL.createObjectURL(file));
  }, []);

  const onSubmit = (values: ICropperImage) => {
    console.log(values);
  };
  const initialValues: any = {
    image: img,
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnBlur: true,
  });
  console.log("img => ", img);

  useEffect(() => {
    cropperFunc();
  }, [img]);

  const cropperFunc = () => {
    if (imgRef.current) {
      const cropper = new Cropper(imgRef.current as HTMLImageElement, {
        aspectRatio: 16 / 9,
        ready() {
        },
      });
      setCropperObj(cropper);
    }
  };

  

  const rotateImg = () => {
    if (imgRef.current) {
      const cropper = new Cropper(imgRef.current as HTMLImageElement, {
        aspectRatio: 16 / 9,
        ready() {
          cropper.rotate(90)
        },
      });
      setCropperObj(cropper);
    }
  };

  return (
    <>
      <Modal>
        <div className={classes.modalBody}>
          {/* <img src={img} alt="" /> */}
          <div className={classes.image}>
            <img
              ref={imgRef as LegacyRef<HTMLImageElement>}
              src={img}
              alt="asdds"
            />
          </div>
          <button onClick={rotateImg} type="button" className="btn btn-primary">
            Rotate
          </button>
          <form
            className={classes.formGroup}
            onSubmit={(e) => formik.handleSubmit(e)}
          >
            <input type="file" onChange={handleImageChange} />
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Зберегти фото
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CropperComponent;
