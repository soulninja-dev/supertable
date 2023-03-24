import { type Dispatch, type SetStateAction, useState } from "react";

const NumberInput = ({
  className,
  setValue,
  value,
  type,
  ...props
}: Props & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex w-max flex-row items-center gap-1.5 rounded-lg px-3 py-1.5 ring-2 ${
        focused ? "ring-[#1a1a1a]" : "ring-[#d0d0d0]"
      }`}
    >
      <input
        className={`${className as string} bg-white font-semibold outline-none appearance-none`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={type ? "number" : "number"}
        {...props}
      />
      <div className="flex flex-col items-center">
        <button onClick={() => setValue(Number(value || 0) + 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-2 w-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button onClick={() => setValue(Number(value || 0) - 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-2 w-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface Props {
  setValue: (arg0: number) => void | Dispatch<SetStateAction<number>>;
}

export default NumberInput;