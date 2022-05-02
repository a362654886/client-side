import * as React from "react";
import { Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

interface IProps {
  uploadImg: string;
  setLoadImg: (imgString: string) => void;
  visible: boolean;
  setVisibleFalse: () => void;
  mall?: boolean;
  radio?: number;
}

const CropImgDiv = ({
  uploadImg,
  setLoadImg,
  visible,
  setVisibleFalse,
  mall,
  radio,
}: IProps): JSX.Element => {
  const ImgCorpRef = useRef<Cropper>(null);

  const [cropper, setCropper] = useState<Cropper>();

  useEffect(() => {
   // console.log(visible);
  }, [visible]);

  const reSize = () => {
    if (typeof cropper !== "undefined") {
      const imgString = cropper
        .getCroppedCanvas({ width: 240, height: 240 })
        .toDataURL();
      setLoadImg(imgString);
    }
  };

  const getCropper = () => {
    return mall ? (
      <Cropper
        src={uploadImg}
        // Cropper.js options
        ref={ImgCorpRef as any}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        cropBoxResizable={true}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
    ) : (
      <Cropper
        src={uploadImg}
        style={{ height: "100%", width: "100%" }}
        // Cropper.js options
        initialAspectRatio={1 / 1}
        ref={ImgCorpRef as any}
        aspectRatio={radio}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        cropBoxResizable={true}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
    );
  };

  return (
    <>
      <Modal footer={[]} onCancel={() => setVisibleFalse()} visible={visible}>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          {getCropper()}
          <Button
            style={{
              right: "0px",
              height: "30px",
              margin: "20px auto",
            }}
            onClick={() => reSize()}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CropImgDiv;

/*
   <Cropper
            src={uploadImg}
            ref={ImgCorpRef as any}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            cropBoxResizable={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
  */
