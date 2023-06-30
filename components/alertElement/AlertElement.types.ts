import { Alert } from 'hooks/useAlert/useAlert.types';

export type AlertProps = Alert & {
  onClose: () => void;
};
