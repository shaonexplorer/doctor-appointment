import Image from "next/image";
import { Controller, Form, useForm } from "react-hook-form";
import CustomSelectInput from "./CustomSelectInput";
import { Doctors } from "@/constants";
import CustomTextArea from "./CustomTextArea";
import CustomDateInput from "./CustomDateInput";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function ModalSchedule({ setShowModal, handleSchedule }) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const appId = searchParams.get("id");

  const { handleSubmit, formState, control } = useForm();
  return (
    <div className="z-50 w-screen h-screen inset-0 fixed bg-[#060708] bg-opacity-[64%] backdrop-blur-sm flex justify-center items-center">
      <div className="w-[640px] h-[646px] p-[40px] rounded-[16px] bg-[#1A1D21] shadow-sm shadow-stone-800 flex flex-col gap-[40px]">
        <section className="relative flex flex-col gap-[20px] bg-transparent">
          <h1 className="text-white text-[24px] bg-transparent">
            Schedule Appointment
          </h1>
          <p className="text-[16px] font-medium text-[#ABB8C4] bg-transparent">
            Please fill in the following details to schedule
          </p>
          <button
            onClick={() =>
              setShowModal((prev) => ({ ...prev, schedule: false }))
            }
            className="absolute top-[10px] right-[10px]"
          >
            <Image
              src={"/home/modal-close.png"}
              width={12}
              height={12}
              alt="close"
            />
          </button>
        </section>
        <section className="bg-transparent">
          <Form
            control={control}
            className="bg-transparent flex flex-col gap-[24px]"
          >
            <Controller
              name="doctor"
              control={control}
              render={({ field }) => (
                <CustomSelectInput
                  label={"Doctor"}
                  placeholder={"Please select a doctor"}
                  options={Doctors}
                  {...field}
                />
              )}
            />

            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <CustomTextArea
                  label={"Reason for appointment"}
                  placeholder={"Ex. annual monthly checkup"}
                  {...field}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CustomDateInput
                  label={"Expected appointment date"}
                  placeholder={"Ex. annual monthly checkup"}
                  {...field}
                />
              )}
            />
          </Form>
        </section>
        <button
          onClick={async () => {
            try {
              setIsLoading(true);
              await handleSchedule(appId);

              setIsLoading(false);

              setShowModal((prev) => ({ ...prev, schedule: false }));
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
          }}
          className="w-full h-[48px] bg-[#24AE7C] rounded-[8px] text-white font-semibold"
        >
          {isLoading ? (
            <div className=" bg-transparent flex items-center justify-center gap-3">
              <p className="bg-transparent">Scheduling</p>
              <Image
                src={"/home/spinner.svg"}
                width={25}
                height={25}
                alt="spinner"
                className=" bg-transparent animate-spin"
              />
            </div>
          ) : (
            "Schedule Appointment"
          )}
        </button>
      </div>
    </div>
  );
}

export default ModalSchedule;
