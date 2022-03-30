/* eslint-disable react-hooks/exhaustive-deps */

import { anyLetter } from "functions/inputRules";
import validityCheck from "functions/validityCheck";
import { standardRules } from "./form";
import { InputProps, InputData, ElementValue } from "utils/formTypes";
import ErrorAlert from "./errorAlert";

export default function Input({
  fieldId,
  data,
  formState,
  validityState,
  labelClass,
  inputClass,
  sharedRules,
}: InputProps) {
  let rules: InputData = standardRules;
  if (sharedRules) rules = sharedRules;

  const [form, setForm] = formState;
  const [validFields, setValidFields] = validityState;

  return (
    <>
      {data.label && (
        <label htmlFor={fieldId} className={labelClass ? labelClass : ""}>
          {data.label}
        </label>
      )}
      <input
        type={data.type ? data.type : rules.type}
        id={fieldId}
        name={fieldId}
        placeholder={data.placeholder}
        value={form[fieldId].toString()}
        className={
          typeof validFields[fieldId] === "string"
            ? `${inputClass} input-not-valid`
            : inputClass
            ? inputClass
            : ""
        }
        onChange={(e) => {
          typeof data.onChange === "function" ? data.onChange(e) : null;
          setForm({ ...form, [fieldId]: e.target.value });
        }}
        onBlur={(e) => {
          typeof data.onBlur === "function" ? data.onBlur(e) : null;
          if (!data.validityQueries && !data.required) return;

          const [valid, error] = validityCheck(
            typeof data.validityQueries === "function"
              ? data.validityQueries(e)
              : anyLetter(e)
          );

          if (!valid) {
            return setValidFields({ ...validFields, [fieldId]: error });
          }

          return setValidFields({ ...validFields, [fieldId]: true });
        }}
        minLength={data.minLength}
        maxLength={data.maxLength}
        onInput={(e) => {
          const ev = { target: e.target as HTMLInputElement };
          typeof data.onInput === "function" ? data.onInput(e) : null;
          typeof data.typeRule === "function" ? data.typeRule(ev) : null;
        }}
        disabled={data.disabled ? data.disabled : rules.disabled}
      />
      <ErrorAlert fieldId={fieldId} validFields={validFields} />
    </>
  );
}
