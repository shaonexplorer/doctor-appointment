import AppointmentForm from "@/components/AppointmentForm";
import Image from "next/image";

function page() {
  return (
    <div className="flex ">
      <div className="flex-1">
        <div className="w-[860px] mx-auto my-[60px] flex flex-col gap-[43px]">
          <Image
            src={"/assets/icons/logo-full.svg"}
            width={160}
            height={32}
            alt="logo"
          ></Image>
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[36px] font-bold text-white mt-[30px]">
              Book Appointment
            </h1>
            <p className="text-[16px] font-medium text-[#ABB8C4]">
              Request a new appointment in 10 seconds
            </p>
          </div>

          <AppointmentForm />
        </div>
      </div>
      <Image
        src={"/assets/images/appointment-img.png"}
        alt="appointment image"
        width={390}
        height={1000}
      ></Image>
    </div>
  );
}

export default page;
