"use client";

import CustomInputField from "@/components/CustomInputField";
import message from "../public/home/message.png";
import phone from "../public/home/phone.png";
import CustomDateInput from "./CustomDateInput";
import CustomRadioInput from "./CustomRadioInput";
import { Controller, Form, useForm } from "react-hook-form";
import CustomSelectInput from "./CustomSelectInput";
import CustomTextArea from "./CustomTextArea";
import { Doctors, IdentificationTypes } from "@/constants";
import CustomUpload from "./CustomUpload";
import { createPatient } from "@/lib/actions/createPatient";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function RegisterForm({ searchParams }) {
  const [loading, setLoading] = useState(false);
  const { control, getValues, formState, handleSubmit, register } = useForm();

  useEffect(() => {
    if (
      formState.errors?.name ||
      formState.errors?.email ||
      formState.errors?.phone ||
      formState.errors?.physician ||
      formState.errors?.birthday ||
      formState.errors?.gender
    )
      window.scrollTo({ top: 0, behavior: "smooth" });
  }, [formState]);

  const params = useParams();
  const router = useRouter();

  async function onSubmit() {
    const data = getValues();

    const userId = params.userId;

    try {
      setLoading(true);
      const response = await createPatient(data, userId);
      setLoading(false);
      if (response)
        router.push(
          `/patients/${userId}/new-appointment?patientId=${response._id}`
        );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Form
      control={control}
      // action={() => handleSubmit()}
      onSubmit={handleSubmit(onSubmit)}
      className="w-[860px] mx-auto flex flex-col gap-[24px]  "
    >
      <h1 className="font-bold text-[30px] mb-[10px] text-white">
        Personal Information
      </h1>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomInputField
            placeholder={"ex: Adam"}
            label={"Full Name"}
            {...field}
          />
        )}
      />

      {formState.errors?.name && (
        <p className="text-red-500">Please enter name</p>
      )}

      <div className="flex gap-[24px] w-full">
        <div className="flex-grow flex flex-col gap-2">
          <Controller
            name="email"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"user@example.com"}
                label={"Email Address"}
                image={message}
                {...field}
              />
            )}
          />
          {formState.errors?.email && (
            <p className="text-red-500">Email is required</p>
          )}
        </div>
        <div className="flex-grow flex flex-col gap-2">
          <Controller
            name="phone"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"+880 1680051016"}
                label={"Phone Number"}
                image={phone}
                {...field}
              />
            )}
          />
          {formState.errors?.phone && (
            <p className="text-red-500">Phone number is required</p>
          )}
        </div>
      </div>
      {/*  */}
      <div className="flex gap-[24px] w-full">
        <div className="flex-grow flex flex-col gap-2">
          <Controller
            name="birthday"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <CustomDateInput
                label={"Date of Birth"}
                placeholder={"select your birth date"}
                {...field}
              />
            )}
          />
          {formState.errors?.birthday && (
            <p className="text-red-500">Date of birth is required</p>
          )}
        </div>
        <div className="w-[418px] flex flex-col gap-2">
          <Controller
            name="gender"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <CustomRadioInput label="Select Gender" {...field} />
            )}
          />
          {formState.errors?.gender && (
            <p className="text-red-500">Gender is required</p>
          )}
        </div>
      </div>
      {/*  */}
      <div className="flex gap-[24px] w-full">
        <div className="flex-grow">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"14th street New York"}
                label={"Address"}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex-grow">
          <Controller
            name="occupation"
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"Software Engineer"}
                label={"Occupation"}
                {...field}
              />
            )}
          />
        </div>
      </div>
      {/*  */}
      <div className="flex gap-[24px] w-full">
        <div className="flex-grow">
          <Controller
            name="emergencyPerson"
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"Gurdian's name "}
                label={"Emergency contact name"}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex-grow">
          <Controller
            name="emergencyPhone"
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"+880 1680051016"}
                label={"Phone Number"}
                image={phone}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <h1 className="font-bold text-[30px] mb-[10px] text-white mt-[40px]">
        Medical Information
      </h1>

      <Controller
        name="physician"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <CustomSelectInput
            placeholder={"Select a physician"}
            label={"Primary care Physician"}
            options={Doctors}
            {...field}
          />
        )}
      />
      {formState.errors?.physician && (
        <p className="text-red-500">Physician is required</p>
      )}
      <div className="flex gap-[24px] w-full">
        <div className="flex-grow">
          <Controller
            name="insuranceProvider"
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"ex: MetLife"}
                label={"Insurance Provider"}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex-grow">
          <Controller
            name="insurancePolicyNumber"
            control={control}
            render={({ field }) => (
              <CustomInputField
                placeholder={"ex: ABC1234"}
                label={"Insurance Policy Number"}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-[24px] w-full">
        <div className="flex-grow">
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={"ex: Peanuts,Penicilin,Pollen"}
                label={"Allergies (if any)"}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex-grow">
          <Controller
            name="medication"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={"ex: Ibuprofen 200mg, Levothyroxin 50mg"}
                label={"Current Medication"}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-[24px] w-full">
        <div className="flex-grow">
          <Controller
            name="familyMedicalHistory"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={"ex: Dibetes,Blood pressure"}
                label={"Family Medical History (if relavent)"}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex-grow">
          <Controller
            name="pastMedicalHistory"
            control={control}
            render={({ field }) => (
              <CustomTextArea
                placeholder={"ex: Diagnosed asthma in childhood"}
                label={"Past Medical History"}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <h1 className="font-bold text-[30px] mb-[10px] text-white mt-[40px]">
        Identification and Verification
      </h1>

      <Controller
        name="idCat"
        control={control}
        render={({ field }) => (
          <CustomSelectInput
            placeholder={"Select an identification type"}
            label={"Identification Type"}
            options={IdentificationTypes}
            {...field}
          />
        )}
      />

      <Controller
        name="idNum"
        control={control}
        render={({ field }) => (
          <CustomInputField
            placeholder={"ex: ABC1234"}
            label={"Identification Number"}
            {...field}
          />
        )}
      />

      <Controller
        name="file"
        control={control}
        render={({ field }) => <CustomUpload {...field} />}
      />

      <h1 className="font-bold text-[30px] mb-[10px] text-white">
        Consent and Privacy
      </h1>

      <label className="text-[#ABB8C4] text-[18px] flex gap-2 items-center">
        <input
          type="checkbox"
          {...register("check", { required: false })}
          className={`w-[24px] h-[24px] ${
            formState.errors?.check
              ? "-outline-offset-4 outline outline-4 outline-red-500"
              : ""
          }`}
        ></input>
        <h1>I consent to receive treatment for my health condition.</h1>
      </label>

      <label className="text-[#ABB8C4] text-[18px] flex gap-2 items-center">
        <input type="checkbox" className="w-[24px] h-[24px]"></input>
        <h1>
          I consent to the use and disclosure of my health information for
          treatment purposes.
        </h1>
      </label>

      <label className="text-[#ABB8C4] text-[18px] flex gap-2 items-center">
        <input type="checkbox" className="w-[24px] h-[24px]"></input>
        <h1>
          I acknowledge that I have reviewed and agree to the privacy policy
        </h1>
      </label>
      <button
        type="submit"
        className="text-white mt-10 font-semibold text-[16px] h-[48px] bg-[#24AE7C] rounded-[8px] w-full py-[8px] mb-[90px]"
      >
        {loading ? (
          <div className=" bg-transparent flex items-center justify-center gap-3">
            <p className="bg-transparent">Submitting</p>
            <Image
              src={"/home/spinner.svg"}
              width={25}
              height={25}
              alt="spinner"
              className=" bg-transparent animate-spin"
            />
          </div>
        ) : (
          "Submit and Continue"
        )}
      </button>
    </Form>
  );
}

export default RegisterForm;
