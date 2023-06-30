import { Alert } from 'hooks/useAlert/useAlert.types';
import { createContext } from 'react';

type AlertContextProps = {
  alert: Alert;
  setAlert: (alert: Alert) => void;
};

export const alertContext = createContext<AlertContextProps>({
  alert: { message: null, type: null, visible: false },
  setAlert: () => {},
});
