import { MapInputsProps } from "utils/formTypes";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

//template of form and validFields to pass

// const [form, setForm] = useState(_.mapValues(fields, () => ''));
// const [validFields, setValidFields] = useState(_.mapValues(fields, () => undefined));

export default function MapInputs({
  fields,
  formState,
  validityState,
  labelClass,
  inputClass,
  textareaClass,
  selectClass,
  sharedRules,
}: MapInputsProps) {
  return (
    <>
      {Object.entries(fields).map(([key, value]) =>
        value.type === "select" ? (
          <Select
            key={key}
            data={value}
            fieldId={key}
            formState={formState}
            validityState={validityState}
            labelClass={labelClass}
            selectClass={selectClass}
            sharedRules={sharedRules}
          />
        ) : value.type === "textarea" ? (
          <Textarea
            key={key}
            data={value}
            fieldId={key}
            formState={formState}
            validityState={validityState}
            labelClass={labelClass}
            textareaClass={textareaClass}
            sharedRules={sharedRules}
          />
        ) : (
          <Input
            key={key}
            data={value}
            fieldId={key}
            formState={formState}
            validityState={validityState}
            labelClass={labelClass}
            inputClass={inputClass}
            sharedRules={sharedRules}
          />
        )
      )}
    </>
  );
}
