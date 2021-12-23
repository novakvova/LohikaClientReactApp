import Cropper from "cropperjs";
import { useFormik } from "formik";
import { LegacyRef, useEffect, useRef, useState } from "react";
import Modal from "../containers/Modal/Modal";
import classes from "./CropperComponent.module.css";
import { ICropperImage } from "./types";
import carPhoto from "./auto_car-08.jpg";
import "cropperjs/dist/cropper.css";

const CropperComponent: React.FC = () => {
  const [img, setImg] = useState<string>(carPhoto);
  const [cropperObj, setCropperObj] = useState<Cropper>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageChange = async (e: any) => {
    const file = (e.target.files as FileList)[0];
    const url = URL.createObjectURL(file);
    await setImg(url);
    cropperObj?.replace(url);
  };

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

  useEffect(() => {
    if (imgRef.current) {
      const cropper = new Cropper(imgRef.current as HTMLImageElement, {
        aspectRatio: 16 / 9,
      });
      cropper.replace(img);
      setCropperObj(cropper);
    }
  }, []);

  const rotateImg = () => {
    if (imgRef.current) {
      cropperObj?.rotate(90);
    }
  };
  const getBase64 = () => {
    const base = cropperObj?.getCroppedCanvas().toDataURL();
    console.log(base)
  };

  return (
    <>
      <Modal>
        <div className={classes.modalBody}>
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
              <button onClick={getBase64} type="button" className="btn btn-primary">
                get base 64
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CropperComponent;
