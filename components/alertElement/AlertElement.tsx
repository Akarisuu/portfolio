import { AlertProps } from './AlertElement.types';

import SuccessIcon from 'public/icons/success.svg';
import ErrorIcon from 'public/icons/error.svg';
import CloseIcon from 'public/icons/close.svg';

export const AlertElement = ({ type, message, visible, onClose }: AlertProps) => {
  return (
    <div
      className={`fixed bottom-[15%] left-1/2 z-50 flex -translate-x-1/2 items-center border-l-2 bg-primary-bg px-3 py-4 transition-all duration-300 ${
        type === 'success' ? 'border-success' : 'border-error'
      }  ${visible ? '' : 'invisible translate-y-10 opacity-0'}`}
    >
      {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
      <p className="ml-4 mr-6 max-w-[300px]">{message}</p>
      <CloseIcon className="h-4 w-4 hover:cursor-pointer" onClick={onClose} />
    </div>
  );
};
