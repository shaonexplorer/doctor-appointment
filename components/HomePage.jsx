"use client";

import CustomInputField from "./CustomInputField";
import user from "../public/user.png";
import message from "../public/home/message.png";
import CustomButton from "./CustomButton";
import { Controller, Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomPhoneInput from "./CustomPhoneInput";
import handle from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const schema = z.object({
    firstName: z
      .string()
      .min(4, { message: "Name must contain at least 4 character(s)" }),
    email: z.string().email({ message: "Please provide a valid email" }),
  });

  const { formState, control, getValues, handleSubmit } = useForm({
    defaultValues: { firstName: "", email: "", phone: "" },
    resolver: zodResolver(schema),
    mode: "all",
  });

  // async function submitFn(e) {
  //   e.preventDefault();
  //   try {
  //     await connectDB();
  //     console.log("database connected");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function onSubmit() {
    let data = getValues();
    try {
      setLoading(true);
      const response = await handle(data);
      // console.log(response);
      setLoading(false);

      if (response.error) {
        alert(response.error);
      } else {
        const newUser = JSON.parse(response);

        if (newUser) router.push(`/patients/${newUser._id}/registration`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="w-[1440px] h-screen mx-auto bg-[#131619] flex">
      <div className="w-[720px] px-[110px] py-[60px] flex flex-col justify-between">
        <Image
          src={"/home/logo.svg"}
          width={160}
          height={32}
          alt="logo"
          className="w-[160px]"
        ></Image>
        <div className="flex flex-col">
          <h1 className="font-bold text-[36px] text-white">Welcome 👋</h1>
          <p className="font-medium text-[18px] text-[#ABB8C4] capitalize">
            get started with appointment
          </p>
          <Form
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            // action={async () => {
            //   let data = getValues();
            //   try {
            //     const response = await handle(data);
            //     console.log(response);

            //     if (response.error) {
            //       alert(response.error);
            //     } else {
            //       const newUser = JSON.parse(response);

            //       if (newUser)
            //         router.push(`/patients/${newUser._id}/registration`);
            //     }
            //   } catch (error) {
            //     console.log(error);
            //   }
            // }}
            className="mt-[64px] flex flex-col gap-y-[24px]"
          >
            <Controller
              name="firstName"
              control={control}
              rules={{ min: 5, required: true }}
              render={({ field }) => (
                <CustomInputField
                  label="Full Name"
                  name={"firstName"}
                  placeholder={"John Doe"}
                  image={user}
                  {...field}
                />
              )}
            />
            {formState.errors.firstName?.message && (
              <p className="text-red-500">
                {formState.errors.firstName?.message}
              </p>
            )}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInputField
                  label="Email Address"
                  placeholder={"user@example.com"}
                  image={message}
                  {...field}
                />
              )}
            />
            {formState.errors.email?.message && (
              <p className="text-red-500">{formState.errors.email?.message}</p>
            )}

            <Controller
              name="phone"
              control={control}
              render={({ field }) => <CustomPhoneInput {...field} />}
            />

            <div className="mt-[24px]">
              <CustomButton
                label={
                  loading ? (
                    <div className=" bg-transparent flex items-center justify-center gap-3">
                      <p className="bg-transparent">Getting Started</p>
                      <Image
                        src={"/home/spinner.svg"}
                        width={25}
                        height={25}
                        alt="spinner"
                        className=" bg-transparent animate-spin"
                      />
                    </div>
                  ) : (
                    "Get Started"
                  )
                }
              />
            </div>
          </Form>
        </div>
        <footer className="flex justify-between items-center">
          <p className="text-[16px] text-[#76828D]">@carepulse copyright</p>
          <Link href={"/admin"} className="text-white">
            Admin
          </Link>
        </footer>
      </div>
      <img src="/home/home.png" className="w-[720px]"></img>
    </div>
  );
}

export default HomePage;
