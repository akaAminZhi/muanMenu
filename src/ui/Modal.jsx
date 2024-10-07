import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { cloneElement, createContext, useContext, useState } from "react";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens, inputRef }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      setTimeout(() => {
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }, 0);
      open(opens);
    },
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  //   const ref = useRef();

  //   useEffect(
  //     function () {
  //       function handleClick(e) {
  //         if (ref.current && !ref.current.contains(e.target)) {
  //           console.log(ref.current, "iiiii", e.target);
  //           close();
  //         }
  //       }

  //       document.addEventListener("click", handleClick, true);

  //       return () => document.removeEventListener("click", handleClick, true);
  //     },
  //     [close]
  //   );

  if (openName !== name) return null;
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen  backdrop-blur-sm transition duration-300 z-[1000]">
      <div className="fixed min-w-96 border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-100  rounded-lg shadow-xl transition duration-500 px-4 py-2 max-h-[80vh] overflow-y-auto">
        <button className="" onClick={close}>
          <HiXMark></HiXMark>
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
