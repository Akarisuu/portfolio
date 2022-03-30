import { ElementValue, ValidityQueries } from "utils/formTypes";

export function number(e: ElementValue) {
  return (e.target.value = e.target.value.replace(/[^0-9]/g, ""));
}

export function tel(e: ElementValue) {
  return (e.target.value = e.target.value.replace(/[^\+0-9]/g, ""));
}

export const requiredFieldError = "This field is required.";

export const valueLength = (
  e: ElementValue,
  length: number,
  errorMessage: string
): ValidityQueries => [
  {
    query: e.target.value.length >= length,
    errorMessage: errorMessage,
  },
];

export const anyLetter = (e: ElementValue): ValidityQueries => [
  {
    query: /\w/.test(e.target.value),
    // errorMessage: "Wartość musi mieć znaki.",
    errorMessage: "Input needs any characters.",
  },
];

export const disallowDoubleWhitespace = (e: ElementValue): ValidityQueries => [
  {
    query: /[^\s\s]/.test(e.target.value),
    // errorMessage: "Wartość nie może zawierać dwóch spacji pod rząd.",
    errorMessage: "Input cannot have two whitespaces in a row.",
  },
];

export const emailQueries = (e: ElementValue): ValidityQueries => [
  {
    query: /\w+@\w+\.\w\w+/g.test(e.target.value),
    // errorMessage: "Błędny e-mail",
    errorMessage: "Wrong e-mail",
  },
];

export const passwordQueries = (e: ElementValue): ValidityQueries => [
  {
    query: e.target.value !== e.target.value.toLowerCase(),
    // errorMessage: "Hasło musi zawierać przynajmniej jedną wielką literę",
    errorMessage: "Password needs at least one uppercase letter",
  },
  {
    query: /\d/.test(e.target.value),
    // errorMessage: "Hasło musi zawierać przynajmniej jedną cyfrę",
    errorMessage: "Password needs at least one number",
  },
  {
    query: e.target.value.length >= 8,
    // errorMessage: "Hasło musi zawierać przynajmniej 8 znaków",
    errorMessage: "Password needs at least 8 characters",
  },
];
