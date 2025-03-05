"use client";

import { Doctors } from "@/constants";
import {
  filterAppointmentByQuery,
  getAppointmentByFilterOptions,
  getSelectedAppointment,
  testPopulate,
} from "@/lib/actions/aggregate";
import {
  getAppointment,
  getAppointmentByFilter,
} from "@/lib/actions/getAppointment";
import {
  cancelAppointment,
  scheduleAppointment,
} from "@/lib/actions/updateAppointment";

import { formateDate } from "@/utils/formateDate";

import Image from "next/image";
import { useEffect, useState } from "react";
import FilterDropDown from "./FilterDropDown";
import { useRouter, useSearchParams } from "next/navigation";
import MoreMenu from "./MoreMenu";
import ModalSchedule from "./ModalSchedule";
import ModalCancel from "./ModalCancel";
import Loader from "./Loader";

function AdminTable() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const filterOptions = searchParams.get("filter");

  const [startingIndex, setStartingIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(7);
  const [data, setData] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showMore, setShowMore] = useState({ id: "", value: false });
  const [showModal, setShowModal] = useState({
    schedule: false,
    cancel: false,
  });

  useEffect(() => {
    async function fetchFilterData() {
      if (filterOptions) {
        setIsLoading(true);
        const newData = await getAppointmentByFilterOptions(filterOptions);

        // console.log(newData);
        setIsLoading(false);

        setLastIndex(7);
        setStartingIndex(0);
        setSearchResult(newData);
      }
      if (!filterOptions) {
        setIsLoading(true);
        const response = await getAppointment();
        setIsLoading(false);
        setLastIndex(7);
        setStartingIndex(0);
        setSearchResult(response);
        setQuery("");
      }
    }
    fetchFilterData();
  }, [filterOptions]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await getAppointment();
      setIsLoading(false);
      setData(response);
      setSearchResult(response);
    }
    fetchData();
  }, []);

  // console.log(response);

  function handlePrevious() {
    setStartingIndex(startingIndex - 7);
    setLastIndex(lastIndex - 7);
  }

  function handleNext() {
    setStartingIndex(startingIndex + 7);
    setLastIndex(lastIndex + 7);
  }

  async function handleSearch(input) {
    let response;
    try {
      setIsLoading(true);
      response = await getAppointment();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    setLastIndex(7);
    setStartingIndex(0);

    if (searchParams.get("filter")) {
      const test = response.filter(
        (item) => item.status == searchParams.get("filter")
      );
      const result = test.filter(
        (value) =>
          value.doctor?.toLowerCase().includes(input.toLowerCase()) ||
          value.patient.email?.toLowerCase().includes(input.toLowerCase()) ||
          value.patient.name?.toLowerCase().includes(input.toLowerCase())
      );

      setQuery(input);

      setSearchResult(result);
    } else {
      const result = response.filter(
        (value) =>
          value?.doctor?.toLowerCase().includes(input.toLowerCase()) ||
          value?.patient?.email?.toLowerCase().includes(input.toLowerCase()) ||
          value?.patient?.name?.toLowerCase().includes(input.toLowerCase())
      );

      setQuery(input);

      setSearchResult(result);
    }
  }

  async function handleOnChange(input) {
    // if (!input && searchParams.get("filter")) {
    //   const response = await getAppointmentByFilter(searchParams.get("filter"));

    //   console.log(response);
    //   setSearchResult(response);
    // }

    // if (!input && !searchParams.get("filter")) {
    //   setLastIndex(7);
    //   setStartingIndex(0);
    //   // setSearchResult(data);
    //   const response = await getAppointment();

    //   setSearchResult(response);
    // } else if (input && searchParams.get("filter")) {
    //   const response = await getAppointmentByFilter(searchParams.get("filter"));
    //   setSearchResult(response);
    // } else {
    //   const result = searchResult.filter(
    //     (value) =>
    //       value.doctor.toLowerCase().includes(input.toLowerCase()) ||
    //       value.patient.email.toLowerCase().includes(input.toLowerCase()) ||
    //       value.patient.name.toLowerCase().includes(input.toLowerCase())
    //   );
    //   setQuery(input);
    //   setSearchResult(result);
    // }

    if (!input && searchParams.get("filter")) {
      const response = await getAppointment();
      const test = response.filter(
        (item) => item.status == searchParams.get("filter")
      );
      setSearchResult(test);
    }

    if (!input && !searchParams.get("filter")) {
      const response = await getAppointment();
      setSearchResult(response);
      setQuery("");
      router.push(`?`);
    }
  }

  async function handleSchedule(id) {
    if (!filterOptions) {
      const response = await getSelectedAppointment(id, query);

      setSearchResult(response);
    } else {
      const response = await filterAppointmentByQuery(
        id,
        searchResult,
        "scheduled"
      );

      setSearchResult(response);
    }
  }

  async function handleCancel(id) {
    if (!filterOptions) {
      const response = await testPopulate(id, query);

      setSearchResult(response);
    } else {
      const response = await filterAppointmentByQuery(
        id,
        searchResult,
        "cancelled",
        query
      );

      setSearchResult(response);
    }
  }
  // if (isLoading) {
  //   return (
  //     <div className="w-[1280px] bg-transparent mx-auto fixed inset-0 z-50 h-screen flex items-center justify-center">
  //       <Image
  //         src={"/home/spinner.svg"}
  //         width={48}
  //         height={48}
  //         alt="spinner"
  //         className="animate-spin"
  //       />
  //     </div>
  //   );
  // }
  return (
    <>
      {showModal.schedule && (
        <ModalSchedule
          setShowModal={setShowModal}
          handleSchedule={handleSchedule}
        />
      )}
      {showModal.cancel && (
        <ModalCancel setShowModal={setShowModal} handleCancel={handleCancel} />
      )}
      <div className="w-[1280px] mx-auto  ">
        <table className="table-auto w-full  h-full text-[14px] font-semibold text-[#E8E9E9] border border-[#1A1D21] rounded-[12px]">
          <thead>
            <tr className="">
              <td colSpan={6} className="text-white bg-[#100623] px-10 py-5">
                <section className="flex items-center gap-3 bg-transparent">
                  <div
                    onClick={() => setShowFilter(!showFilter)}
                    className="relative cursor-pointer h-[40px] px-[10px] py-[10px] flex items-center gap-[10px] border border-[#1A1D21] rounded-[6px] bg-[#291254]"
                  >
                    <Image
                      src={"/home/Vector.png"}
                      width={15}
                      height={15}
                      alt="filter"
                      className="bg-transparent"
                    ></Image>
                    <p className="text-[#8B83BA] text-[14px] tracking-wider bg-transparent">
                      {filterOptions || "Filter"}
                    </p>

                    {showFilter && (
                      <FilterDropDown setShowFilter={setShowFilter} />
                    )}
                  </div>
                  {/* search bar */}
                  <input
                    onChange={(e) => handleOnChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") handleSearch(e.target.value);
                    }}
                    placeholder="Search by doctor, patient or email"
                    className="w-[392px] h-[40px] p-[10px] rounded-[6px] bg-[#291254] text-[#8B83BA] text-[14px] tracking-wider outline-none focus:outline-[#6D5BD0]"
                  ></input>
                  <p className="text-white ml-auto">
                    Showing {searchResult?.length} results
                  </p>
                </section>
              </td>
            </tr>
            <tr>
              <th className="w-[140px]">
                <p className="flex justify-center bg-transparent">Index No</p>
              </th>
              <th>
                <p className="flex justify-start bg-transparent">Patient</p>
              </th>
              <th>
                <p className="flex justify-start bg-transparent">Date</p>
              </th>
              <th>
                <p className="flex justify-start bg-transparent">Status</p>
              </th>
              <th>
                <p className="flex justify-start bg-transparent">Doctor</p>
              </th>
              <th className="">
                <button className="w-[20px] h-[20px] flex justify-center items-center">
                  <Image
                    src={"/home/More.png"}
                    width={6}
                    height={20}
                    alt="more"
                    className="bg-transparent"
                  />
                </button>
              </th>
            </tr>
            {isLoading && (
              <tr className="h-fit">
                <td className="h-fit" colSpan={6}>
                  <Loader />
                </td>
              </tr>
            )}
          </thead>
          <tbody>
            {searchResult &&
              searchResult.length > 0 &&
              searchResult.slice(startingIndex, lastIndex).map((value) => (
                <tr key={value._id}>
                  <td className="flex justify-center  items-center h-full text-[#24AE7C]">
                    <p className="bg-transparent">
                      {searchResult.indexOf(value) + 1}
                    </p>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1 capitalize bg-[#1C2023]">
                      <p className="bg-transparent">{value.patient?.name}</p>
                      <p className="bg-transparent text-stone-500 lowercase">
                        {value.patient?.email}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex   bg-[#1C2023]  items-center text-[#E8E9E9]">
                      {formateDate(value.date)}
                    </div>
                  </td>
                  <td>
                    <div className="flex   bg-[#1C2023]   items-center">
                      <span
                        className={`${
                          value.status == "scheduled"
                            ? "bg-[#0D2A1F] text-[#24AE7C]"
                            : value.status == "pending"
                            ? "bg-[#152432] text-[#79B5EC]"
                            : "bg-[#3E1716] text-[#F37877]"
                        } w-fit  font-semibold py-[2px] px-[6px] rounded-[12px] flex items-center justify-center gap-[6px]`}
                      >
                        <Image
                          src={`${
                            value.status == "scheduled"
                              ? "/home/check.png"
                              : value.status == "pending"
                              ? "/assets/icons/pending.svg"
                              : "/assets/icons/close-red.png"
                          }`}
                          width={12}
                          height={12}
                          alt="check"
                          className="bg-transparent"
                        ></Image>
                        <p className="bg-transparent"> {value.status}</p>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex   items-center gap-2 capitalize bg-[#1C2023]  ">
                      <Image
                        src={
                          Doctors.find((doc) => doc.name == value.doctor)?.image
                        }
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full"
                      />
                      {value.doctor}
                    </div>
                  </td>
                  <td>
                    <div className="flex   gap-2 bg-[#1C2023] relative">
                      {/* <button
                    onClick={async () => {
                      if (!filterOptions) {
                        const response = await getSelectedAppointment(
                          value._id,
                          query
                        );
                        console.log(response);
                        setSearchResult(response);
                      }

                      const response = await filterAppointmentByQuery(
                        value._id,
                        searchResult,
                        "scheduled"
                      );

                      setSearchResult(response);

                      // const result = await scheduleAppointment(value._id);
                      // setData(result);
                    }}
                    className="text-[#24AE7C] text-[14px] font-semibold"
                  >
                    Schedule
                  </button>
                  <button
                    onClick={async () => {
                      // const response = await cancelAppointment(value._id);
                      // setData(response);

                      if (!filterOptions) {
                        const response = await testPopulate(value._id, query);
                        console.log(response);
                        setSearchResult(response);
                      }
                      const response = await filterAppointmentByQuery(
                        value._id,
                        searchResult,
                        "cancelled"
                      );

                      setSearchResult(response);
                    }}
                    className=" font-semibold text-[14px]"
                  >
                    Cancel
                  </button> */}

                      <button
                        onClick={() => {
                          setShowMore({
                            ...showMore,
                            value: true,
                            id: value._id,
                          });
                          params.set("id", value._id);
                          router.replace(`?${params.toString()}`);
                        }}
                        className="w-[20px] h-[20px] flex justify-center items-center"
                      >
                        <Image
                          src={"/home/More.png"}
                          width={6}
                          height={20}
                          alt="more"
                          className="bg-transparent"
                        />
                      </button>
                      {showMore.value && showMore.id == value._id && (
                        <MoreMenu
                          setShowMore={setShowMore}
                          setShowModal={setShowModal}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} className="">
                <div className="flex items-center justify-end gap-3 px-5 py-[10px] bg-transparent">
                  <button
                    className="bg-[#0D0F10] px-[8px] rounded-[12px] text-[#24AE7C] font-semibold w-[70px] h-[32px] hover:scale-105 transition duration-300"
                    disabled={startingIndex <= 0}
                    onClick={() => handlePrevious()}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-[#0D0F10] px-[8px] rounded-[12px] text-[#24AE7C] font-semibold w-[70px] h-[32px] hover:scale-105 transition duration-300"
                    disabled={lastIndex >= searchResult?.length}
                    onClick={() => handleNext()}
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default AdminTable;
