import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

function SuccessToast(title) {
  return toast.success(title, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
function ErrorToast(title) {
  return toast.error(title, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
let isClickUndo = false;
function UndoToast(tableRow, id, users) {
  return toast(
    <div className="d-flex justify-content-between align-items-center pe-3">
      <button className="btn btn-light" onClick={() => handleUndo(tableRow, users)}>
        Undo
      </button>
      <span>User deleted</span>
    </div>,
    {
      onClose: () => handleDelete(id, tableRow),
      position: "bottom-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );
}

const handleUndo = (tableRow, users) => {
  isClickUndo = true;
  if (users == 1) {
    document.querySelector(`#tbody`).innerHTML = "";
  }
  document.querySelector(`#tbody`).appendChild(tableRow);
};
const handleDelete = (id, tableRow) => {
  if (!isClickUndo) {
    axios.delete(`https://crud-users-gold.vercel.app/users/${id}`).catch((err) => {
      document.querySelector(`#tbody`).appendChild(tableRow);
      if (err.response != undefined) {
        ErrorToast(`${err.response.data.message}, plase refesh page`);
      } else {
        ErrorToast(err.message);
      }
    });
  }
};
export { SuccessToast, ErrorToast, UndoToast };
