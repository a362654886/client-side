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
}

const CropImgDiv = ({
  uploadImg,
  setLoadImg,
  visible,
  setVisibleFalse,
}: IProps): JSX.Element => {
  const ImgCorpRef = useRef<Cropper>(null);

  const [cropper, setCropper] = useState<Cropper>();

  useEffect(() => {
    console.log(visible);
  }, [visible]);

  const reSize = () => {
    if (typeof cropper !== "undefined") {
      const imgString = cropper
        .getCroppedCanvas({ width: 240, height: 240 })
        .toDataURL();
      setLoadImg(imgString);
    }
  };

  return (
    <>
      <Modal footer={[]} onCancel={() => setVisibleFalse()} visible={visible}>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <Cropper
            src={uploadImg}
            style={{ height: "100%", width: "100%" }}
            // Cropper.js options
            initialAspectRatio={1 / 1}
            ref={ImgCorpRef as any}
            zoomTo={0.5}
            viewMode={1}
            aspectRatio={1}
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
