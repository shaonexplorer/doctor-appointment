"use client";

import { useState } from "react";

function CustomRadioInput({ label, name, placeholder, ...field }) {
  return (
    <label className="flex flex-col gap-y-[16px]">
      <span className="text-[#ABB8C4] font-medium text-[14px]">{label}</span>

      <div className="flex items-center justify-between gap-[18px]  h-[48px] rounded-[8px]   text-white font-medium text-[16px]   outline-none  ">
        <div className="flex w-full items-center justify-center gap-[10px] px-[16px] py-[12px] border border-[#363A3D] border-dashed bg-[#1A1D21] rounded-[8px]">
          <input
            value="male"
            onChange={(e) => field.onChange(e.target.value)}
            className="w-[20px] h-[20px]"
            type="radio"
            name="gender"
          ></input>
          <p className="text-[#CDCECF] text-[16px] font-medium">Male</p>
        </div>
        <div className="flex w-full items-center justify-center gap-[10px] px-[16px] py-[12px] border border-[#363A3D] border-dashed rounded-[8px]">
          <input
            value="female"
            onChange={(e) => field.onChange(e.target.value)}
            className="w-[20px] h-[20px]"
            type="radio"
            name="gender"
          ></input>
          <p className="text-[#CDCECF] text-[16px] font-medium">Female</p>
        </div>
        <div className="flex w-full items-center justify-center gap-[10px] px-[16px] py-[12px] border border-[#363A3D] border-dashed rounded-[8px]">
          <input
            value="other"
            onChange={(e) => field.onChange(e.target.value)}
            className="w-[20px] h-[20px]"
            type="radio"
            name="gender"
          ></input>
          <p className="text-[#CDCECF] text-[16px] font-medium">Other</p>
        </div>
      </div>
    </label>
  );
}

export default CustomRadioInput;
