import { createPortal } from "react-dom";
import Button from "./Button";
import { HiXMark } from "react-icons/hi2";
import { createContext, useState } from "react";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen  backdrop-blur-sm transition duration-300 z-[1000]">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-100 border-2 rounded-lg shadow-xl transition duration-300 px-4 py-2">
        <button onClick={onClose}>
          <HiXMark></HiXMark>
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
