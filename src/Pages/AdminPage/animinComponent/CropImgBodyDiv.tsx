import * as React from "react";
import { Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import { ImageBody } from "../ImageUpload";

interface IProps {
  uploadImg: ImageBody;
  setLoadImg: (imgString: ImageBody) => void;
  visible: boolean;
  setVisibleFalse: () => void;
}

const CropImgBodyDiv = ({
  uploadImg,
  setLoadImg,
  visible,
  setVisibleFalse,
}: IProps): JSX.Element => {
  const ImgCorpRef = useRef<Cropper>(null);

  const [cropper, setCropper] = useState<Cropper>();

  useEffect(() => {
    //console.log(visible);
  }, [visible]);

  const reSize = () => {
    if (typeof cropper !== "undefined") {
      const imgString = cropper.getCroppedCanvas().toDataURL();
      uploadImg.imgBase64 = imgString;
      setLoadImg(uploadImg);
    }
  };

  return (
    <>
      <Modal
        width={400}
        footer={[]}
        onCancel={() => setVisibleFalse()}
        maskClosable={false}
        visible={visible}
      >
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <Cropper
            src={uploadImg.imgBase64}
            style={{ height: "280px", width: "280px" }}
            // Cropper.js options
            initialAspectRatio={1}
            /* eslint-disable @typescript-eslint/no-explicit-any */
            ref={ImgCorpRef as any}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            viewMode={1}
            aspectRatio={1}
            background={false}
            responsive={true}
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

export default CropImgBodyDiv;
