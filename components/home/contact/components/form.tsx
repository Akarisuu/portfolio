import { alert, contactContent } from "utils/types";
import { useState, FormEvent, useRef } from "react";
import axios from "config/axios";
import DoubleArrow from "public/icons/doubleArrow.svg";
import Loading from "public/icons/loading.svg";
import ContactCard from "./card";
import Alert from "./alert";

export default function ContactForm({
  content,
  cardContent,
}: {
  content: contactContent["form"];
  cardContent: contactContent["others"];
}) {
  const [isSending, setIsSending] = useState(false);
  const [alert, _setAlert] = useState<alert>({
    status: null,
    message: null,
    visible: false,
  });
  const alertRef = useRef(alert);

  const setAlert = ({ status, message, visible }: alert) => {
    _setAlert({ status, message, visible });
    alertRef.current = { status, message, visible };
  };

  const initialForm = {
    name: "",
    email: "",
    topic: "",
    message: "",
  };
  const [form, setForm] = useState(initialForm);

  const autoCloseAlert = () =>
    setTimeout(
      () =>
        setAlert({
          ...alertRef.current,
          visible: false,
        }),
      7500
    );

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);

    await axios
      .post("/mailhandler", form)
      .then(() => {
        setForm(initialForm);
        setAlert({
          status: "success",
          message: content.alert.success,
          visible: true,
        });
        setIsSending(false);
        autoCloseAlert();
      })
      .catch(() => {
        setAlert({
          status: "error",
          message: content.alert.error,
          visible: true,
        });
        setIsSending(false);
        autoCloseAlert();
      });
  }

  return (
    <form
      className="grid grid-cols-1 row-auto gap-x-8 gap-y-4 mt-12 xl:grid-cols-3 z-10"
      onSubmit={submitForm}
    >
      <div className="first:mt-0 relative">
        <input
          type="text"
          placeholder={`${content.name}*`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input peer"
          required
        />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
      </div>
      <div className="relative xl:mt-0 xl:w-full xl:justify-self-end">
        <input
          type="email"
          placeholder={`${content.email}*`}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input peer"
          required
        />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
      </div>
      <div className="relative xl:col-span-2">
        <input
          type="text"
          placeholder={`${content.topic}*`}
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="input peer"
          required
        />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
      </div>
      <div className="relative flex xl:col-span-2">
        <textarea
          placeholder={`${content.message}*`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input peer resize-none h-[250px] xl:h-[350px]"
          required
        />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
      </div>
      {isSending ? (
        <button
          type="submit"
          className="self-start mt-3 px-4 py-2 flex items-center rounded-md font-bold justify-self-start bg-[#9EC2CD] cursor-not-allowed"
        >
          {content.submit.pending}...
          <Loading className="ml-2 w-4 h-4 animate-spin" />
        </button>
      ) : (
        <button
          type="submit"
          className="self-start mt-3 px-4 py-2 flex items-center rounded-md font-bold justify-self-start bg-tertiary"
        >
          {content.submit.base}
          <DoubleArrow className="ml-5 h-3 w-3" />
        </button>
      )}
      <ContactCard content={cardContent} />
      <Alert
        status={alert.status}
        message={alert.message}
        visible={alert.visible}
        setAlert={setAlert}
      />
    </form>
  );
}
