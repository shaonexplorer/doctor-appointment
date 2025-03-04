import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

function MoreMenu({ setShowMore, setShowModal }) {
  const options = ["schedule", "cancel"];
  return (
    <div className="z-50 shadow-sm shadow-stone-500 absolute top-[27px] right-[35px] w-[154px] py-[5px] px-[5px] flex flex-col gap-2 bg-[#ffffff] rounded-[6px]  ">
      <section className="relative w-full h-full bg-transparent">
        <button
          onClick={() =>
            setShowMore((prev) => ({ ...prev, id: "", value: false }))
          }
          className="z-50 absolute shadow-sm shadow-stone-600 -right-[15px] -top-[15px] w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center"
        >
          {/* <Image
            src={"/home/Close.png"}
            width={10}
            height={10}
            alt="close"
            className="bg-transparent"
          /> */}
          <IoMdClose className="bg-transparent w-5 h-5 text-[#d7584d]" />
        </button>
        {options.map((item) => (
          <div
            onClick={() => {
              setShowMore((prev) => ({ ...prev, id: "", value: false }));
              if (item == "schedule") {
                setShowModal((prev) => ({ ...prev, schedule: true }));
              } else if (item == "cancel") {
                setShowModal((prev) => ({ ...prev, cancel: true }));
              }
            }}
            key={item}
            className="p-[5px] rounded-[4px] hover:bg-[#F2F0F9] bg-transparent cursor-pointer flex items-center gap-2"
          >
            {item == "schedule" ? (
              <FcOk className="bg-transparent w-5 h-5" />
            ) : (
              <FcCancel className="bg-transparent w-5 h-5" />
            )}
            <p
              className={`${
                item == "schedule"
                  ? "text-[#007F00]"
                  : item == "cancel"
                  ? "text-[#D30000]"
                  : "text-stone-700"
              } bg-transparent capitalize `}
            >
              {item}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MoreMenu;
