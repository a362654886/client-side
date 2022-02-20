import * as React from "react";
import { ReactElement, useState } from "react";
import { DeleteButtons, DeleteModal, DeleteText } from "../cssJs/deleteCss";
import { AnimeButton } from "./Button";
interface IProps {
  element: ReactElement;
  deleteFn: (id: string | number | null) => void;
}

const DeleteWrapperDiv = ({ element, deleteFn }: IProps): JSX.Element => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setDeleteModal(true)}>
        <>{element}</>
      </div>
      <DeleteModal
        footer={[]}
        onCancel={() => setDeleteModal(false)}
        visible={deleteModal}
      >
        <DeleteText>Sure to Delete it?</DeleteText>
        <DeleteButtons>
          <AnimeButton
            para=""
            text={"Cancel"}
            width="120px"
            height="32px"
            textColor="#979797"
            backGroundColor="white"
            borderColor="#979797"
            buttonClick={() => setDeleteModal(false)}
          />
          <div
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            <AnimeButton
              para=""
              text={"Delete"}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white"
              borderColor="black"
              buttonClick={deleteFn}
            />
          </div>
        </DeleteButtons>
      </DeleteModal>
    </>
  );
};

export default DeleteWrapperDiv;
