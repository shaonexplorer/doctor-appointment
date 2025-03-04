import Image from "next/image";
import Link from "next/link";

function AdminHeader() {
  return (
    <div className="w-full h-[80px] rounded-[12px] bg-[#100623] flex items-center justify-between px-5">
      <Link href={"/"} className="bg-transparent">
        <Image
          src={"/home/logo.svg"}
          width={160}
          height={32}
          alt="logo"
          className="w-[160px] bg-transparent"
        />
      </Link>
      <div className="flex items-center gap-2 bg-transparent">
        <span className="w-[38px] h-[38px] overflow-hidden rounded-full flex justify-center items-center bg-white">
          <Image
            src={"/home/avatar.png"}
            width={32}
            height={32}
            alt="avatar"
            className="bg-transparent"
          />
        </span>
        <h1 className="text-white font-semibold bg-transparent">Admin</h1>
      </div>
    </div>
  );
}

export default AdminHeader;
