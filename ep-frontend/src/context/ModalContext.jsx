import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../components/Button";
import { X } from "lucide-react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const open = useCallback((component) => {
    setModalContent(component);
  }, []);

  const close = useCallback(() => {
    setModalContent(null);
  }, []);

  useEffect(() => {
    if (modalContent) {
    document.body.classList.add("overflow-hidden");
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("fixed")) {
        close();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [modalContent]);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {modalContent &&
        createPortal(
          <div className="fixed inset-0 z-50 flex justify-center items-center h-full bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="relative max-w-lg w-full max-h-[90vh] bg-white rounded-lg shadow-lg my-8 overflow-y-auto">
              <Button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={close}
              >
                <X size={24} />
              </Button>
              <div className="p-4">{modalContent}</div>
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};