import { ValidityQueries } from "utils/formTypes";

export default function validityCheck(queries: ValidityQueries) {
  let valid = true;
  let error = "";

  for (const { query, errorMessage } of queries) {
    if (query) continue;

    valid = false;
    error = errorMessage;
    break;
  }
  return [valid, error];
}
