/* eslint-disable react-hooks/exhaustive-deps */

import validityCheck from "functions/validityCheck";
import { anyLetter } from "functions/inputRules";
import { standardRules } from "./form";
import { InputData, TextareaProps } from "utils/formTypes";
import ErrorAlert from "./errorAlert";

export default function Textarea({
  fieldId,
  data,
  formState,
  validityState,
  labelClass,
  textareaClass,
  sharedRules,
}: TextareaProps) {
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
      <textarea
        id={fieldId}
        name={fieldId}
        placeholder={data.placeholder}
        rows={data.rows}
        cols={data.cols}
        value={form[fieldId].toString()}
        className={
          typeof validFields[fieldId] === "string"
            ? `${textareaClass} input-not-valid`
            : textareaClass
            ? textareaClass
            : ""
        }
        onChange={(e) => {
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
        onInput={(e) => {
          const ev = { target: e.target as HTMLTextAreaElement };
          typeof data.onInput === "function" ? data.onInput(e) : null;
          typeof data.typeRule === "function" ? data.typeRule(ev) : null;
        }}
        disabled={data.disabled ? data.disabled : rules.disabled}
      />
      <ErrorAlert fieldId={fieldId} validFields={validFields} />
    </>
  );
}
