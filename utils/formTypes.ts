import { ChangeEvent, FormEvent } from "react";

// Shared/Global types
export type ValidityObject = { [name: string]: string | boolean };

export type FormObject = { [name: string]: string | boolean };

export type StateType<stateObject> = [stateObject, (e: stateObject) => void];

export type FormElementKeys = Extract<keyof StateType<FormObject>[0], string>;

export type ValidityQueries = {
  query: boolean;
  errorMessage: string;
}[];

export type InputFields = {
  [name: string]: InputData | SelectData | TextareaData;
};

interface SharedInputsProps {
  fieldId: FormElementKeys;
  formState: StateType<FormObject>;
  validityState: StateType<ValidityObject>;
  labelClass?: string;
  sharedRules?: SharedInputsData;
}

interface SharedInputsData {
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange?: (e: object) => void;
  onBlur?: (e: object) => void;
  validityQueries?: (
    e: ElementValue
  ) => { query: boolean; errorMessage: string }[];
  onInput?: (e: object) => void;
  typeRule?: (e: ElementValue) => void;
}

type inputTypes =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export type ElementValue = { target: { value: string } };

//Types for <Input>
export interface InputProps extends SharedInputsProps {
  data: InputData;
  inputClass?: string;
}

export interface InputData extends SharedInputsData {
  type?: inputTypes;
}

//Types for <Select>
export interface SelectProps extends SharedInputsProps {
  data: SelectData;
  selectClass?: string;
}

export interface SelectData extends SharedInputsData {
  type: "select";
  options: {
    name: string;
    value: string | number;
  }[];
}

//Types for <Textarea>
export interface TextareaProps extends SharedInputsProps {
  data: TextareaData;
  textareaClass?: string;
}

export interface TextareaData extends SharedInputsData {
  type: "textarea";
  rows?: number;
  cols?: number;
}

//Types for <MapInputs>
export type MapInputsProps = {
  fields: InputFields;
  formState: StateType<FormObject>;
  validityState: StateType<ValidityObject>;
  labelClass?: string;
  inputClass?: string;
  textareaClass?: string;
  selectClass?: string;
  sharedRules?: object;
};

//Types for <Form>
export type FormProps = {
  autoFields?: InputFields;
  inputRules?: InputData;
  children?: React.ReactNode[];
  formClass?: string;
  labelClass?: string;
  inputClass?: string;
  textareaClass?: string;
  selectClass?: string;
  onSubmit?: (e: FormObject) => void;
};
