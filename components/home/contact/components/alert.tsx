import SuccessIcon from "public/icons/success.svg";
import ErrorIcon from "public/icons/error.svg";
import CloseIcon from "public/icons/close.svg";
import { Dispatch, SetStateAction } from "react";
import { alert } from "utils/types";

export default function Alert({
  status,
  message,
  visible,
  setAlert,
}: {
  status: "success" | "error" | null;
  message: string | null;
  visible: boolean;
  setAlert: ({ status, message, visible }: alert) => void;
}) {
  return (
    <div
      className={`fixed bottom-[15%] left-1/2 -translate-x-1/2 flex items-center bg-primaryBackground px-3 py-4 ${
        status === "success" ? "border-[#49eb56]" : "border-[#ed4a4a]"
      } border-l-2 transition-all duration-300 ${
        visible ? "" : "opacity-0 translate-y-10"
      }`}
    >
      {status === "success" ? <SuccessIcon /> : <ErrorIcon />}
      <p className="ml-4 mr-6 max-w-[300px]">{message}</p>
      <CloseIcon
        className="w-4 h-4 hover:cursor-pointer"
        onClick={() => setAlert({ status, message, visible: false })}
      />
    </div>
  );
}
