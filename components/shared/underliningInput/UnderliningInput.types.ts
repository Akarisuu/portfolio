import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type UnderliningInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
  isWide?: boolean;
  isTextArea?: boolean;
};
