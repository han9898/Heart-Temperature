import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  /** 버튼 내용 */
  label: string;
}

export function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={
        "flex cursor-pointer items-center justify-center rounded-xl my-4 px-[22px] py-[10px] text-sm font-semibold duration-200 hover:scale-[1.02] active:scale-[0.9] disabled:scale-100 disabled:cursor-not-allowed md:text-md bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-100 h-[44px] w-[332px]"
      }
      {...props}
    >
      {label}
    </button>
  );
}
