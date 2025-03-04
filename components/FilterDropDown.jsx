import { useRouter, useSearchParams } from "next/navigation";

function FilterDropDown({ setShowFilter }) {
  const filterOptions = ["All", "Scheduled", "Pending", "Cancelled"];
  const searchParams = useSearchParams();
  const options = searchParams.get("filter");
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  return (
    <div className="z-50 absolute top-[50px] left-0 w-[224px] rounded-[6px] py-[10px] px-[10px] text-[#8B83BA] flex flex-col gap-1 bg-[#291254]">
      {filterOptions.map((item) => (
        <div
          key={item}
          onClick={() => {
            setShowFilter(false);
            if (item !== "All") {
              router.push(`?filter=${item.toLowerCase()}`, { scroll: false });
            } else if (item == "All") {
              params.delete("filter");
              router.replace(`?${params.toString()}`);
            }
          }}
          className={`group ${
            options == item.toLowerCase() ? "bg-[#F2F0F9]" : ""
          } rounded-[4px] bg-transparent hover:bg-[#F2F0F9] py-[5px] px-[10px] flex items-center justify-between`}
        >
          <p className="bg-transparent">{item}</p>
          <span
            className={`${
              options == item.toLowerCase() ? "border-[5px]" : ""
            } w-[15px] h-[15px] rounded-full border border-[#8B83BA] group-hover:border-[5px] bg-transparent`}
          ></span>
        </div>
      ))}
    </div>
  );
}

export default FilterDropDown;
