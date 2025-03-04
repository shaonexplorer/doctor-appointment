import Image from "next/image";

function StatCard() {
  return (
    <div className="w-[400px] h-[150px] rounded-[12px] p-[24px] bg-gradient-to-r from-[#9b9bbf] to-[#242431] flex flex-col gap-[24px]">
      <div className="flex gap-5">
        <Image
          src={"/assets/icons/appointments.svg"}
          width={32}
          height={32}
          alt="image"
          className="bg-transparent"
        ></Image>
      </div>
      <p className="text-white bg-transparent">
        Total number of Scheduled appointments
      </p>
    </div>
  );
}

export default StatCard;
