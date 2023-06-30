import { UnderliningInputProps } from './UnderliningInput.types';

export const UnderliningInput = ({ isWide, isTextArea, label, type, register }: UnderliningInputProps) => {
  return (
    <div className={`relative ${isWide && 'xl:col-span-2'}`}>
      {isTextArea ? (
        <textarea
          {...register}
          placeholder={label}
          className="peer h-[250px] w-full resize-none bg-primary-bg px-4 py-2 shadow-lg placeholder:text-gray-500 focus:outline-none xl:h-[350px]"
        />
      ) : (
        <input
          type={type}
          {...register}
          placeholder={label}
          className="peer w-full bg-primary-bg px-4 py-2 shadow-lg placeholder:text-gray-500 focus:outline-none"
        />
      )}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-tertiary transition-all duration-300 peer-focus:w-full"></span>
    </div>
  );
};
