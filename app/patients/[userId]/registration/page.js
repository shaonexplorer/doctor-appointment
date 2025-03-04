import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";

function page() {
  return (
    <div className="flex justify-between  w-screen  ">
      <div className="flex-1 my-[60px]  ">
        <div className="w-[860px] mx-auto flex flex-col gap-[43px]  ">
          <img src="/home/logo.svg" className="w-[160px]"></img>

          <RegisterForm />
        </div>
      </div>
      <div className="h-full">
        <Image
          src={"/registration/image.png"}
          width="390"
          height="1098"
          alt="image"
        ></Image>
      </div>
    </div>
  );
}

export default page;
