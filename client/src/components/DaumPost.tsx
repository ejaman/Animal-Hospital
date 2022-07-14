import React from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import Modal from "react-modal";

const ModalStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    left: "0",
    width: "500px",
    height: "600px",
    padding: "0",
    margin: "auto",
    overflow: "hidden",
  },
};

interface DaumPostProps {
  isOpen: boolean;
  completeHandler: (address: Address) => void;
}

const DaumPost: React.FC<DaumPostProps> = ({ isOpen, completeHandler }) => {
  return (
    <Modal isOpen={isOpen} ariaHideApp={false} style={ModalStyle}>
      <DaumPostcode onComplete={completeHandler} />
    </Modal>
  );
};

export default DaumPost;
