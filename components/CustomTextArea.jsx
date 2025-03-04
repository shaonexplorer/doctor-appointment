"use client";

import { useState } from "react";

function CustomTextArea({ name, label, placeholder, ...field }) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="flex flex-col gap-y-[16px] bg-transparent">
      <span className="text-[#ABB8C4] font-medium text-[14px] bg-transparent">
        {label}
      </span>
      <div
        className={`relative w-full h-fit flex items-center justify-center p-[1px]  ${
          focus
            ? " bg-gradient-to-r from-[#82DBF7] to-[#B6F09C] rounded-[8px]"
            : " bg-none rounded-[12px]"
        } `}
      >
        <textarea
          rows="3"
          placeholder={placeholder}
          name={name}
          value={field.value}
          onChange={field.onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${
            focus ? "border-none" : "border-[#363A3D] border-[1px]"
          } $ px-[16px] py-[12px] w-full   rounded-[8px]   text-white font-medium text-[16px] bg-[#1A1D21] outline-none shadow-[0px_0px_0px_4px_rgba(132, 220, 245, 0.24)]`}
        ></textarea>
      </div>
    </label>
  );
}

export default CustomTextArea;
