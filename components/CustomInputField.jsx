"use client";

import Image from "next/image";
import { useState } from "react";

function CustomInputField({
  label,
  image,

  placeholder,
  name,
  ...field
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="flex flex-col gap-y-[16px]">
      <span className="text-[#ABB8C4] font-medium text-[14px]">{label}</span>
      <div
        className={`relative w-full h-fit flex items-center justify-center p-[1px]  ${
          focus
            ? " bg-gradient-to-r from-[#82DBF7] to-[#B6F09C] rounded-[8px]"
            : " bg-none rounded-[12px]"
        } `}
      >
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={field.value}
          onChange={field.onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${
            focus ? "border-none" : "border-[#363A3D] border-[1px]"
          } ${
            image ? "pl-[54px]" : "pl-[16px] pr-[38px]"
          } w-full h-[48px] rounded-[8px]   text-white font-medium text-[16px] bg-[#1A1D21] outline-none shadow-[0px_0px_0px_4px_rgba(132, 220, 245, 0.24)]`}
        ></input>
        {image && (
          <Image
            className="absolute left-[21px] top-[16px]"
            alt="user"
            src={image}
          ></Image>
        )}
      </div>
    </label>
  );
}

export default CustomInputField;
