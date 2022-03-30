/* eslint-disable react-hooks/exhaustive-deps */

import validityCheck from "functions/validityCheck";
import { anyLetter } from "functions/inputRules";
import { standardRules } from "./form";
import { InputData, SelectProps } from "utils/formTypes";
import ErrorAlert from "./errorAlert";

export default function Select({
  fieldId,
  data,
  formState,
  validityState,
  labelClass,
  selectClass,
  sharedRules,
}: SelectProps) {
  const [form, setForm] = formState;
  const [validFields, setValidFields] = validityState;

  let rules: InputData = standardRules;
  if (sharedRules) rules = sharedRules;

  return (
    <>
      {data.label && (
        <label htmlFor={fieldId} className={labelClass ? labelClass : ""}>
          {data.label}
        </label>
      )}
      <select
        id={fieldId}
        name={fieldId}
        className={
          typeof validFields[fieldId] === "string"
            ? `${selectClass} input-not-valid`
            : selectClass
            ? selectClass
            : ""
        }
        onChange={(e) => {
          setForm({
            ...form,
            [fieldId]: e.target.options[e.target.selectedIndex].value,
          });
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
        value={form[fieldId].toString()}
        disabled={data.disabled ? data.disabled : rules.disabled}
      >
        {!form[fieldId] && <option hidden value=""></option>}
        {data.options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      <ErrorAlert fieldId={fieldId} validFields={validFields} />
    </>
  );
}
