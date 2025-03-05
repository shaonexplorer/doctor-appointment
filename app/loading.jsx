import Image from "next/image";

function loading() {
  return (
    <div className="text-white w-screen h-screen z-50 fixed inset-0 bg-transparent flex items-center justify-center">
      <Image
        src={"/home/spinner.svg"}
        width={48}
        height={48}
        alt="spinner"
        className="animate-spin"
      />
    </div>
  );
}

export default loading;
