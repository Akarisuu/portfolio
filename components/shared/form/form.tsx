/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import _ from "lodash";
import MapInputs from "./mapInputs";
import modifyJSXChildren from "utils/formModifyJSXChildren";
import { requiredFieldError } from "functions/inputRules";
import {
  FormObject,
  FormProps,
  InputData,
  ValidityObject,
} from "utils/formTypes";

type StandardRules = Omit<InputData, "data"> & { value: string };

export const standardRules: StandardRules = {
  value: "",
  type: "text",
  disabled: false,
  required: false,
};

export default function Form({
  autoFields,
  inputRules,
  children,
  formClass,
  labelClass,
  inputClass,
  textareaClass,
  selectClass,
  onSubmit,
}: FormProps) {
  const sharedRules = inputRules
    ? {
        ...standardRules,
        ...inputRules,
      }
    : standardRules;

  const inputs = {
    ...autoFields,
  };

  const [isCustomSubmit, setIsCustomSubmit] = useState(false);

  function getJSXFormElements(ch: React.ReactNode) {
    React.Children.forEach(ch, (child: React.ReactNode) => {
      if (React.isValidElement(child)) {
        const { type, props } = child;

        if (
          (type === "input" || type === "select" || type === "textarea") &&
          props &&
          typeof props === "object"
        ) {
          if (!props.name)
            throw new Error(
              "<input>, <select> and <textarea> as child inside <Form></Form> have to have a 'name' attribute."
            );

          if (!isCustomSubmit && props.type === "submit")
            return setIsCustomSubmit(true);

          return (inputs[props.name] = {
            ...props,
          });
        } else if (
          type === "button" &&
          !isCustomSubmit &&
          (props.type === "submit" || props.type === undefined)
        )
          return setIsCustomSubmit(true);
        else if (
          props.children &&
          Array.isArray(props.children) &&
          typeof props.children !== "string"
        ) {
          return getJSXFormElements(props.children);
        }
      }
      return;
    });
  }

  if (children) getJSXFormElements(children);

  //Creating object with keys based on fields which need validation
  const validationFields = (): ValidityObject => {
    const obj: ValidityObject = {};

    if (!inputs) return obj;

    Object.entries(inputs).forEach(([key, { validityQueries, required }]) => {
      if (!validityQueries && !required) return;
      obj[key] = false;
    });

    return obj;
  };

  //Mapping object with starting values of fields based on values passed from fields object or sharedRules
  const formFields = (): FormObject => {
    if (!inputs) return {};

    return {
      ..._.mapValues(inputs, ({ value, type }) =>
        value ? value : type === "checkbox" ? "false" : sharedRules.value
      ),
    };
  };

  // create state with values from autoFields and children passed in <Form></Form>, then the same for fields which need validation
  const [form, setForm] = useState(formFields);
  const [validFields, setValidFields] = useState(validationFields);

  // add value and onChange listener to each input/textarea child
  const modifiedChildren = modifyJSXChildren(
    children,
    [form, setForm],
    [validFields, setValidFields]
  );

  return (
    <form
      className={formClass}
      onSubmit={(e) => {
        e.preventDefault();
        const newValidFields = { ...validFields };

        Object.keys(validFields).forEach((key) => {
          if (validFields[key] === false)
            return (newValidFields[key] = requiredFieldError);
          return;
        });

        setValidFields(newValidFields);

        if (
          Object.values(newValidFields).some(
            (value) => typeof value === "string"
          )
        )
          return;
        onSubmit && onSubmit(form);
      }}
    >
      {autoFields && (
        <MapInputs
          fields={autoFields}
          formState={[form, setForm]}
          validityState={[validFields, setValidFields]}
          labelClass={labelClass}
          inputClass={inputClass}
          textareaClass={textareaClass}
          selectClass={selectClass}
          sharedRules={sharedRules}
        />
      )}
      {modifiedChildren}
      {!isCustomSubmit && <button type="submit">send</button>}
    </form>
  );
}
