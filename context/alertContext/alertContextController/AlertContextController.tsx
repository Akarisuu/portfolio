import { useState, useEffect, ReactChild } from 'react';
import { alertContext } from '../alertContext';
import { Alert } from 'hooks/useAlert/useAlert.types';
import { AlertElement } from 'components/alertElement/AlertElement';

export const AlertContextController = ({ children }: { children: ReactChild }) => {
  const [alert, _setAlert] = useState<Alert>({
    type: null,
    message: null,
    visible: false,
  });

  const onClose = () => _setAlert((prev) => ({ ...prev, visible: false }));

  const setAlert = ({ type, message, visible }: Alert) => {
    _setAlert({ type, message, visible });
  };

  useEffect(() => {
    if (alert.visible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 7500);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return (
    <alertContext.Provider value={{ alert, setAlert }}>
      <AlertElement message={alert.message} onClose={onClose} type={alert.type} visible={alert.visible} />
      {children}
    </alertContext.Provider>
  );
};
