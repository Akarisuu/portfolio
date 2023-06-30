import { useContext } from 'react';
import { alertContext } from 'context/alertContext/alertContext';

export const useAlert = () => {
  const ctx = useContext(alertContext);

  return ctx;
};
