"use client";

import { useModal } from "@/app/contexts/ModalContext";

export default function Modal() {

  const { modalProps, setModalProps } = useModal();

  const onYes = () => {
    modalProps?.callback();
    onClose()
  }

  const onClose = () => {
    setModalProps(null);
  }

  return (
    <div
      className={`shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      {modalProps && modalProps.text && (
        <div className="bg-zinc-300 p-5 flex flex-col gap-2 justify-center items-end text-center rounded">
          <span onClick={onClose} className="absolute top-0 right-1 cursor-default">X</span>
          <p>{modalProps.text}</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="p-2 bg-red-500 cursor-pointer">Cancelar</button>
            <button onClick={onYes} className="p-2 bg-blue-500 cursor-pointer">Sim</button>
          </div>
        </div>
      )}
    </div>
  );
}
