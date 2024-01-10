import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function UploadLogo() {
  const [modalOpen, setModalOpen] = useState<boolean>();

  return (
    <>
      <label
        htmlFor="my_modal_1"
        className="btn btn-info text-white mb-3 h-max"
      >
        <FaUpload size="1.5em" /> Upload Logo
      </label>
      <input
        type="checkbox"
        id="my_modal_1"
        className="modal-toggle"
        checked={modalOpen}
      />

      <div className="modal" role="dialog">
        <div className="modal-box"></div>

        <label
          className="modal-backdrop cursor-pointer"
          htmlFor="my_modal_1"
        ></label>
      </div>
    </>
  );
}
