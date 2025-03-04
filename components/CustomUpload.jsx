"use client";

import { uploadImage } from "@/lib/actions/uploadImage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

async function handleUpload({ file }) {
  try {
    const response = await uploadImage(file);
    const url = JSON.parse(response);
    console.log(url);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

function CustomUpload({ ...field }) {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState();
  const [isUploading, setIsUploading] = useState(false);

  function imageLoader() {
    return "https://yellow-raw-boar-897.mypinata.cloud/ipfs/bafkreifxgghy2czp5dj4hq6dsyxvw5hbhdqctalgl4wv4gxrprfaakotea";
  }

  useEffect(() => {
    async function handleUpload(file) {
      try {
        setIsUploading(true);
        const response = await uploadImage(file);
        const url = JSON.parse(response);
        setUrl(url);
        field.onChange(url);
        console.log(url);
        setIsUploading(false);
      } catch (error) {
        console.log(error);
        alert(error);
        setIsUploading(false);
      }
    }
    if (file) handleUpload(file);
  }, [file]);
  return (
    <>
      <label className="text-[14px] text-[#ABB8C4]">
        Scanned copy of identification document
      </label>
      <div className="w-full h-[134px] rounded-[8px] border-dashed border-[#363A3D] border bg-[#1A1D21] px-[24px] py-[20px] flex flex-col gap-1 justify-center items-center">
        <input
          ref={ref}
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          hidden
        ></input>

        <Image
          src={"/assets/icons/upload.svg"}
          alt="upload image"
          width={40}
          height={40}
          className="rounded-full"
        ></Image>
        <button
          disabled={isUploading}
          onClick={(e) => {
            e.preventDefault();
            ref.current.click();
          }}
          className="text-[#24AE7C] text-[14px] font-semibold"
        >
          {isUploading ? "Uploading ..." : "Click to upload"}
        </button>
        <p className="text-[#76828D] text-[12px] bg-[#1A1D21]">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>

      {url && (
        <div className="w-full relative rounded-[8px]  border-[#363A3D] border bg-[#1A1D21]   flex gap-2 justify-center items-center">
          <img src={url} className="w-[860px] h-[430px] "></img>
          <button
            className="absolute top-[20px] right-[20px]"
            onClick={() => setUrl()}
          >
            <MdDeleteForever className="text-[50px] text-red-500 bg-transparent" />
          </button>
        </div>
      )}
    </>
  );
}

export default CustomUpload;
