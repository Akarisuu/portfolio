import DoubleArrow from 'public/icons/doubleArrow.svg';
import Loading from 'public/icons/loading.svg';
import ContactCard from '../Card';
import { useTranslation } from 'next-i18next';
import { useAlert } from 'hooks/useAlert/useAlert';
import { Form, useForm } from 'react-hook-form';
import { ContactFormSchema } from './Form.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UnderliningInput } from 'components/shared/underliningInput/UnderliningInput';

export default function ContactForm() {
  const { t } = useTranslation('contact');
  const { setAlert } = useAlert();

  const {
    control,
    register,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSuccess = () => {
    setAlert({
      type: 'success',
      message: t(['form.alert.success']),
      visible: true,
    });
  };

  const onError = () => {
    setAlert({
      type: 'error',
      message: t(['form.alert.error']),
      visible: true,
    });
  };

  return (
    <Form
      className="z-10 row-auto mt-12 grid grid-cols-1 gap-x-8 gap-y-4 xl:grid-cols-3"
      action="/api/mailhandler"
      onSuccess={onSuccess}
      onError={onError}
      control={control}
      encType="application/json"
      validateStatus={(status) => status === 200}
    >
      <UnderliningInput type="text" label={`${t(['form.name'])}*`} register={register('name', { required: true })} />
      <UnderliningInput type="email" label={`${t(['form.email'])}*`} register={register('email', { required: true })} />
      <UnderliningInput
        type="text"
        label={`${t(['form.topic'])}*`}
        register={register('topic', { required: true })}
        isWide
      />
      <UnderliningInput
        label={`${t(['form.message'])}*`}
        register={register('message', { required: true })}
        isTextArea
        isWide
      />

      {isSubmitting ? (
        <button
          type="submit"
          className="mt-3 flex cursor-not-allowed items-center self-start justify-self-start rounded-md bg-tertiary-disabled px-4 py-2 font-bold"
        >
          {t(['form.submit.pending'])}...
          <Loading className="ml-2 h-4 w-4 animate-spin" />
        </button>
      ) : (
        <button
          type="submit"
          className="mt-3 flex items-center self-start justify-self-start rounded-md bg-tertiary px-4 py-2 font-bold transition-colors duration-300 disabled:bg-tertiary-disabled"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              {t(['form.submit.pending'])}...
              <Loading className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              {t(['form.submit.base'])}
              <DoubleArrow className="ml-5 h-3 w-3" />
            </>
          )}
        </button>
      )}
      <ContactCard />
    </Form>
  );
}
