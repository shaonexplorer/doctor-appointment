"use client";

function CustomButton({ label }) {
  return (
    <button
      type="submit"
      className="w-full bg-[#24AE7C] h-[48px] px-[24px] py-[8px] text-white font-semibold text-[16px] rounded-[8px] capitalize hover:bg-[#131619] hover:border-[#24AE7C] hover:border hover:text-[#24AE7C] duration-500 transition-all"
    >
      {label}
    </button>
  );
}

export default CustomButton;
