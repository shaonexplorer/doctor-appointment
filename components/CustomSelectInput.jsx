"use client";

import Image from "next/image";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

function CustomSelectInput({ name, placeholder, label, options, ...field }) {
  const [show, setShow] = useState(false);
  const [doctor, setDoctor] = useState({
    name: placeholder,
    image: "",
  });

  return (
    <label className="flex flex-col gap-y-[16px] bg-transparent">
      <span className="text-[#ABB8C4] font-medium text-[14px] bg-transparent">
        <p className="bg-transparent ">{label}</p>
      </span>
      <div
        className={`relative w-full h-fit flex items-center justify-center p-[1px]  ${
          show
            ? " bg-gradient-to-r from-[#82DBF7] to-[#B6F09C] rounded-[8px]"
            : " bg-none rounded-[12px]"
        } `}
      >
        <div
          onClick={() => setShow(!show)}
          className={`${
            show ? "border-none" : "border-[#363A3D] border-[1px]"
          }   flex items-center justify-between cursor-pointer px-[16px]  w-full h-[48px] rounded-[8px]   text-white font-medium text-[16px] bg-[#1A1D21] outline-none shadow-[0px_0px_0px_4px_rgba(132, 220, 245, 0.24)]`}
        >
          <div
            className={`flex items-center bg-[#1A1D21] gap-2 px-[12px] py-[6px] rounded-[8px] ${
              doctor.image ? " border border-[#363A3D]" : "border-none"
            }`}
          >
            {doctor.image && (
              <Image
                src={doctor.image}
                width={24}
                height={24}
                alt="doctor image"
              ></Image>
            )}
            <h1 className="bg-transparent">{doctor.name}</h1>
          </div>
          <div className="bg-transparent">
            {show ? (
              <FaAngleUp className="bg-transparent" />
            ) : (
              <FaAngleDown className="bg-transparent" />
            )}
          </div>
          {show && (
            <div className="z-40 shadow-md shadow-stone-800 absolute top-[55px] w-full rounded-[8px] left-0 px-[16px] py-[12px] bg-[#1A1D21]">
              {options.map((doc, index) => (
                <div
                  onClick={() => {
                    if (!doc.name) {
                      setDoctor({ ...doctor, name: doc });
                    } else
                      setDoctor({
                        ...doctor,
                        name: doc.name,
                        image: doc.image,
                      });
                    if (!doc.name) {
                      field.onChange(doc);
                    } else field.onChange(doc.name);
                  }}
                  key={index}
                  className="w-full flex items-center gap-2 bg-[#1A1D21] px-[16px] py-[9px] hover:bg-gradient-to-r from-[#323232] to-[#181818] rounded-[12px] hover:text-lime-500 transition-all duration-300"
                >
                  {doc.image && (
                    <Image
                      src={doc.image}
                      height={48}
                      width={48}
                      alt="doctor"
                      className="rounded-full bg-stone-500 hover:scale-110 transition-all duration-300"
                    ></Image>
                  )}
                  {doc.name && <h1 className="bg-transparent">{doc.name}</h1>}
                  {!doc.name && <h1 className="bg-transparent">{doc}</h1>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </label>
  );
}

export default CustomSelectInput;
