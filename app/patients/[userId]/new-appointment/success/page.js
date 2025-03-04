import { Doctors } from "@/constants";
import { getSingleAppointment } from "@/lib/actions/getAppointment";
import { formateDate } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";

async function page({ searchParams }) {
  let appointment;
  let doctorImage;
  // let doctorImage = "/assets/images/dr-green.png";
  try {
    const appointmentId = (await searchParams).appointmentId;

    appointment = await getSingleAppointment(appointmentId);

    doctorImage = Doctors.find(
      (doctor) => doctor.name === appointment.doctor
    ).image;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="relative text-white flex flex-col items-center justify-center w-[1280px] mx-auto h-screen bg-primary gap-[10px]">
      <Link href={"/"} className="absolute top-[60px]">
        <Image
          src={"/assets/icons/logo-full.svg"}
          width={160}
          height={32}
          alt="logo"
        />
      </Link>

      <Image
        src={"/home/success.png"}
        height={100}
        width={100}
        alt="success"
      ></Image>
      <h1 className="text-[36px] font-bold w-[612px]  text-center">
        Your <span className="text-[#4AC97E]">appointment request</span> has
        been successfully submitted!
      </h1>
      <p className="text-[#ABB8C4] text-[18px] font-medium text-center mt-[10px]">
        We will be in touch shortly to confirm.
      </p>
      <div className="h-[130px] w-full border-y border-[#363A3D] flex justify-center items-center gap-2 mt-[30px]">
        <p className="text-[#ABB8C4] font-medium text-[24px]">
          Requested Appointment details:
        </p>
        <span className="w-fit h-[45px] rounded-[5px] px-[12px] py-[10px] border border-[#FFFFFF] border-opacity-[8%] flex items-center gap-2">
          <Image
            src={doctorImage}
            width={24}
            height={24}
            alt="image"
            className="rounded-full"
          />
          <p>{appointment.doctor}</p>
        </span>
        <span className="w-fit h-[45px] rounded-[5px] px-[12px] py-[10px]  flex items-center gap-2">
          <Image
            src="/assets/icons/calendar.svg"
            width={24}
            height={24}
            alt="image"
          />
          <p>{formateDate(appointment.date)}</p>
        </span>
      </div>
    </div>
  );
}

export default page;
