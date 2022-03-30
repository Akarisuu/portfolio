import React, { ChangeEvent, ReactChildren, ReactNode } from "react";
import validityCheck from "functions/validityCheck";
import { anyLetter } from "functions/inputRules";
import {
  StateType,
  FormObject,
  ValidityObject,
  ElementValue,
} from "./formTypes";
import ErrorAlert from "components/shared/form/errorAlert";

export default function modifyJSXChildren(
  children: ReactNode,
  formState: StateType<FormObject>,
  validityState: StateType<ValidityObject>
): React.ReactNode {
  const [form, setForm] = formState;
  const [validFields, setValidFields] = validityState;

  // Helpers
  const onBlurFunction = (e: ElementValue, child: ReactNode) => {
    if (!React.isValidElement(child)) return;
    typeof child.props.onBlur === "function" ? child.props.onBlur(e) : null;
    if (!child.props.validityQueries && !child.props.required) return;

    const [valid, error] = validityCheck(
      typeof child.props.validityQueries === "function"
        ? child.props.validityQueries(e)
        : [anyLetter(e)]
    );

    if (!valid) {
      return setValidFields({ ...validFields, [child.props.name]: error });
    }

    return setValidFields({ ...validFields, [child.props.name]: true });
  };

  const checkboxProps = (child: ReactNode) => {
    if (React.isValidElement(child))
      return {
        ...child.props,
        value: form[child.props.name],
        className:
          typeof validFields[child.props.name] === "string"
            ? `${child.props.className} input-not-valid`
            : child.props.className
            ? child.props.className
            : "",
        checked: form[child.props.name] === "true" ? true : false,
        required: false,
        onChange: (e: ElementValue) => {
          typeof child.props.onChange === "function"
            ? child.props.onChange(e)
            : null;
          setForm({
            ...form,
            [child.props.name]:
              form[child.props.name] === "true" ? "false" : "true",
          });
        },
        onBlur: (e: ElementValue) => onBlurFunction(e, child),
      };
  };

  const inputProps = (child: ReactNode) => {
    if (React.isValidElement(child))
      return {
        ...child.props,
        value: form[child.props.name],
        className:
          typeof validFields[child.props.name] === "string"
            ? `${child.props.className} input-not-valid`
            : child.props.className
            ? child.props.className
            : "",
        required: false,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          typeof child.props.onChange === "function"
            ? child.props.onChange(e)
            : null;
          setForm({ ...form, [child.props.name]: e.target.value });
        },
        onBlur: (e: ElementValue) => onBlurFunction(e, child),
      };
  };

  const selectProps = (child: ReactNode) => {
    if (React.isValidElement(child))
      return {
        ...child.props,
        className:
          typeof validFields[child.props.name] === "string"
            ? `${child.props.className} input-not-valid`
            : child.props.className
            ? child.props.className
            : "",
        value: form[child.props.name],
        required: false,
        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
          typeof child.props.onChange === "function"
            ? child.props.onChange(e, child)
            : null;
          setForm({
            ...form,
            [child.props.name]: e.target.options[e.target.selectedIndex].value,
          });
        },
        onBlur: (e: ElementValue) => onBlurFunction(e, child),
      };
  };
  // End of helpers

  return React.Children.map(children, (child: ReactNode) => {
    if (React.isValidElement(child)) {
      if (
        child.props.children &&
        (Array.isArray(child.props.children) ||
          typeof child.props.children !== "string")
      ) {
        return React.cloneElement(child, {
          children: modifyJSXChildren(
            child.props.children,
            [form, setForm],
            [validFields, setValidFields]
          ),
        });
      } else if (child.type === "input" || child.type === "textarea") {
        if (child.props.type === "submit") return child;
        if (child.props.type === "checkbox") {
          return (
            <>
              {React.cloneElement(child, checkboxProps(child))}
              <ErrorAlert
                fieldId={child.props.name}
                validFields={validFields}
              />
            </>
          );
        }
        return (
          <>
            {React.cloneElement(child, inputProps(child))}
            <ErrorAlert fieldId={child.props.name} validFields={validFields} />
          </>
        );
      } else if (child.type === "select") {
        return (
          <>
            {React.cloneElement(child, selectProps(child))}
            <ErrorAlert fieldId={child.props.name} validFields={validFields} />
          </>
        );
      }
    }
    return child;
  });
}
