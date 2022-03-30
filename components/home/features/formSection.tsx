import Form from "components/shared/form/form";
import { emailQueries, passwordQueries, tel } from "functions/inputRules";
import { ElementValue, FormObject, InputFields } from "utils/formTypes";

function FormExample() {
  const autoFields: InputFields = {
    email: {
      type: "email",
      placeholder: "e-mail",
      label: "E-mail:",
      validityQueries: (e: ElementValue) => emailQueries(e),
    },
    phoneNumber: {
      type: "tel",
      placeholder: "phone number",
      label: "Your phone number: ",
      typeRule: (e: ElementValue) => tel(e),
      minLength: 9,
      maxLength: 12,
    },
    password: {
      type: "password",
      placeholder: "password",
      label: "Password: ",
      validityQueries: (e: ElementValue) => passwordQueries(e),
    },
    documentType: {
      type: "select",
      label: "Select document type:",
      required: true,
      options: [
        {
          name: "Passport",
          value: "passport",
        },
        {
          name: "ID",
          value: "id",
        },
      ],
    },
  };

  const onSubmit = (values: FormObject) => {
    window.alert(JSON.stringify(values, undefined, 2));
  };

  return (
    <Form
      autoFields={autoFields}
      onSubmit={onSubmit}
      formClass="flex flex-col"
      inputClass="form-input"
      labelClass="form-label"
      selectClass="form-select"
    >
      <p className="mt-10 font-normal text-lg mb-2">
        Tell me something about{" "}
        <span className="text-primary font-black">you</span>:
      </p>
      <textarea
        name="about"
        placeholder="Type something here..."
        rows={8}
        className="resize-none form-input"
        required
      />
      <div className="flex items-center mt-2">
        <label
          htmlFor="checkbox"
          className="hover:cursor-pointer hover:text-secondary"
        >
          Click me!
        </label>
        <input className="ml-2" type="checkbox" name="checkbox" id="checkbox" />
      </div>
      <button type="submit">Check the data!</button>
    </Form>
  );
}

export default function FormSection() {
  return (
    <section className="p-wrapper flex justify-between">
      <div className="flex flex-col w-1/2 max-h-screen">
        <pre className="bg-gray-100 text-black p-6 rounded-xl break-words overflow-auto">
          {`import Form from "components/shared/form/form";
import { emailQueries, passwordQueries, tel } from "functions/inputRules";
import { FormObject, InputFields } from "utils/formTypes";

export default function FormExample() {
  const autoFields: InputFields = {
    email: {
      type: "email",
      placeholder: "e-mail",
      label: "E-mail:",
      validityQueries: (e: object) => emailQueries(e),
    },
    phoneNumber: {
      type: "tel",
      placeholder: "phone number",
      label: "Your phone number: ",
      typeRule: (e: object) => tel(e),
      minLength: 9,
      maxLength: 12,
    },
    password: {
      type: "password",
      placeholder: "password",
      label: "Password: ",
      validityQueries: (e: object) => passwordQueries(e),
    },
    documentType: {
      type: "select",
      label: "Select document type:",
      required: true,
      options: [
        {
          name: "Passport",
          value: "passport",
        },
        {
          name: "ID",
          value: "id",
        },
      ],
    },
  };

  const onSubmit = (values: FormObject) => {
    window.alert(JSON.stringify(values, undefined, 2));
  };

  return (
    <Form
      autoFields={autoFields}
      formClass="flex flex-col"
      onSubmit={onSubmit}
      inputClass="form-input"
      labelClass="form-label"
      selectClass="form-select"
    >
      <p className="mt-10 font-normal text-lg mb-2">
        Tell me something about{" "}
        <span className="text-primary font-black">you</span>:
      </p>
      <textarea
        name="about"
        placeholder="Type something here..."
        rows={8}
        className="resize-none form-input"
        required
      />
      <div className="flex items-center mt-2">
        <label
          htmlFor="checkbox"
          className="hover:cursor-pointer hover:text-secondary"
        >
          Click me!
        </label>
        <input className="ml-2" type="checkbox" name="checkbox" id="checkbox" />
      </div>
      <button type="submit">Check the data!</button>
    </Form>
  );
}`}
        </pre>
      </div>
      <div className="flex flex-col w-[40%] justify-center">
        <h2 className="list-item-slash text-3xl pl-10 font-bold mb-8 before:tracking-[-6px]">
          Easy forms
        </h2>
        <FormExample />
      </div>
    </section>
  );
}
