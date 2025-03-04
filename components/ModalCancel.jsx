import Image from "next/image";
import { Controller, Form, useForm } from "react-hook-form";
import CustomTextArea from "./CustomTextArea";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function ModalCancel({ setShowModal, handleCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const { control } = useForm();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("id");
  return (
    <div className="z-50 w-screen h-screen inset-0 fixed bg-[#060708] bg-opacity-[64%] backdrop-blur-sm flex justify-center items-center">
      <div className="w-[640px] p-[40px] rounded-[16px] bg-[#1A1D21] shadow-sm shadow-stone-800 flex flex-col gap-[40px]">
        <section className="relative flex flex-col gap-[20px] bg-transparent">
          <h1 className="text-white text-[24px] bg-transparent">
            Cancel Appointment
          </h1>
          <p className="text-[16px] font-medium text-[#ABB8C4] bg-transparent">
            Are you sure want to cancel the appointment
          </p>
          <button
            onClick={() => setShowModal((prev) => ({ ...prev, cancel: false }))}
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
              name="reason"
              control={control}
              render={({ field }) => (
                <CustomTextArea
                  label={"Reason for cancellation"}
                  placeholder={"ex. urgent meeting came up"}
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
              await handleCancel(appointmentId);
              setIsLoading(false);
              setShowModal((prev) => ({ ...prev, cancel: false }));
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
          }}
          className="w-full h-[48px] bg-[#F24E43] rounded-[8px] text-white font-semibold"
        >
          {isLoading ? (
            <div className=" bg-transparent flex items-center justify-center gap-3">
              <p className="bg-transparent">Cancelling</p>
              <Image
                src={"/home/spinner.svg"}
                width={25}
                height={25}
                alt="spinner"
                className=" bg-transparent animate-spin"
              />
            </div>
          ) : (
            "Cancel Appointment"
          )}
        </button>
      </div>
    </div>
  );
}

export default ModalCancel;
