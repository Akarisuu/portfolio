import { ValidityObject } from "utils/formTypes";

export default function ErrorAlert({
  fieldId,
  validFields,
}: {
  fieldId: string;
  validFields: ValidityObject;
}) {
  return (
    <>
      {typeof validFields[fieldId] === "string" && (
        <p className="alert-not-valid">{validFields[fieldId]}</p>
      )}
    </>
  );
}
