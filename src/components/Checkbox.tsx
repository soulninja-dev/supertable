import type { Dispatch, SetStateAction } from "react";

const Checkbox = ({ className, checked, setChecked }: Props) => {
  return checked ? (
    <div
      onClick={() => setChecked(!checked)}
      className={`${
        className as string
      }  flex h-4 w-4 cursor-pointer items-center justify-center rounded bg-[#1a1a1a] ring-2 ring-[#1a1a1a]`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="h-3 w-3 stroke-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </div>
  ) : (
    <div
      onClick={() => setChecked(!checked)}
      className={`${
        className as string
      }  h-4 w-4 cursor-pointer rounded bg-white ring-2 ring-[#d0d0d0]`}
    ></div>
  );
};

interface Props {
  className?: string;
  checked: boolean;
  setChecked: (arg0: boolean) => void | Dispatch<SetStateAction<boolean>>;
}

export default Checkbox;