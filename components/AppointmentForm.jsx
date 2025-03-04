"use client";

import { Controller, Form, useForm } from "react-hook-form";
import CustomSelectInput from "./CustomSelectInput";
import { Doctors } from "@/constants";
import CustomTextArea from "./CustomTextArea";
import CustomDateInput from "./CustomDateInput";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createAppointment } from "@/lib/actions/createAppointment";

function AppointmentForm() {
  const { control, formState, getValues, handleSubmit } = useForm();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  async function onSubmit(e) {
    // e.preventDefault();
    console.log(formState);
    let data = getValues();
    const user = params.userId;
    const patient = searchParams.get("patientId");
    try {
      const response = await createAppointment(data, user, patient);
      console.log(response);
      if (response)
        router.push(
          `/patients/${user}/new-appointment/success?appointmentId=${response._id}`
        );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form
      control={control}
      onSubmit={(e) => handleSubmit(onSubmit(e))}
      className="flex flex-col gap-[24px]"
    >
      <Controller
        name="doctor"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomSelectInput
            options={Doctors}
            label={"Doctors"}
            placeholder={"Select a doctor"}
            {...field}
          />
        )}
      />
      {formState.errors?.doctor && (
        <p className="text-red-500">Doctor is required</p>
      )}
      <div className="flex gap-[24px]">
        <div className="flex-1">
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={"ex: annual monthly checkup"}
                label={"Reason for appointment"}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex-1">
          <Controller
            name="comments"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={"ex: prefer afternoon appointment"}
                label={"Additional comments/notes"}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <Controller
        name="date"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomDateInput label={"Expected appointment date"} {...field} />
        )}
      />
      {formState.errors?.date && (
        <p className="text-red-500">Appointment date is required</p>
      )}
      <button
        type="submit"
        className="text-white mt-10 font-semibold text-[16px] h-[48px] bg-[#24AE7C] rounded-[8px] w-full py-[8px] mb-[90px]"
      >
        submit and continue
      </button>
    </Form>
  );
}

export default AppointmentForm;
