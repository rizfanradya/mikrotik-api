import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function UploadLogo() {
  const [modalOpen, setModalOpen] = useState<boolean>();

  return (
    <>
      <label
        htmlFor="my_modal_1"
        className="btn btn-neutral text-white mb-3 h-max"
      >
        <FaUpload size="1.5em" /> Edit Logo
      </label>
      <input
        type="checkbox"
        id="my_modal_1"
        className="modal-toggle"
        checked={modalOpen}
      />

      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-8">Upload Logo</h3>
          <form className="flex justify-between flex-col gap-4">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />

            <div className="modal-action">
              <button className="btn btn-success text-white">
                Upload Logo
              </button>
              <label
                htmlFor="my_modal_1"
                className="btn btn-neutral text-white"
              >
                Close
              </label>
            </div>
          </form>
        </div>

        <label
          className="modal-backdrop cursor-pointer"
          htmlFor="my_modal_1"
        ></label>
      </div>
    </>
  );
}
