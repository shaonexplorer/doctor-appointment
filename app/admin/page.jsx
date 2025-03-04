// "use client";

import AdminHeader from "@/components/AdminHeader";
import AdminTable from "@/components/AdminTable";
import StatCard from "@/components/StatCard";

// import { Doctors } from "@/constants";
// import { getAppointment } from "@/lib/actions/getAppointment";
// import {
//   cancelAppointment,
//   scheduleAppointment,
// } from "@/lib/actions/updateAppointment";

// import { formateDate } from "@/utils/formateDate";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// function Admin() {
//   const [startingIndex, setStartingIndex] = useState(0);
//   const [lastIndex, setLastIndex] = useState(7);
//   const [data, setData] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       const response = await getAppointment();
//       setData(response);
//     }
//     fetchData();
//   }, []);

//   // console.log(response);

//   function handlePrevious() {
//     setStartingIndex(startingIndex - 7);
//     setLastIndex(lastIndex - 7);
//   }

//   function handleNext() {
//     setStartingIndex(startingIndex + 7);
//     setLastIndex(lastIndex + 7);
//   }

//   return (
//     <div className="w-[1280px] mx-auto py-7">
//       <table className="table-fixed w-full h-[700px] text-[14px] font-semibold text-[#E8E9E9] border border-[#1A1D21] rounded-[12px]">
//         <thead>
//           <tr>
//             <th className="w-[70px]">Index No</th>
//             <th className="w-[200px]">Patient</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Doctor</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data &&
//             data.slice(startingIndex, lastIndex).map((value) => (
//               <tr key={value._id}>
//                 <td className="flex justify-center items-center h-full text-[#24AE7C]">
//                   <p>{data.indexOf(value) + 1}</p>
//                 </td>
//                 <td>
//                   <div className="flex justify-center capitalize bg-[#1C2023] h-full items-center">
//                     {value.patient.name}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="flex justify-center bg-[#1C2023] h-full items-center text-[#E8E9E9]">
//                     {formateDate(value.date)}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="flex justify-center bg-[#1C2023] h-full items-center">
//                     <span
//                       className={`${
//                         value.status == "scheduled"
//                           ? "bg-[#0D2A1F] text-[#24AE7C]"
//                           : value.status == "pending"
//                           ? "bg-[#152432] text-[#79B5EC]"
//                           : "bg-[#3E1716] text-[#F37877]"
//                       } w-fit  font-semibold py-[2px] px-[6px] rounded-[12px] flex items-center justify-center gap-[6px]`}
//                     >
//                       <Image
//                         src={`${
//                           value.status == "scheduled"
//                             ? "/home/check.png"
//                             : value.status == "pending"
//                             ? "/assets/icons/pending.svg"
//                             : "/assets/icons/close-red.png"
//                         }`}
//                         width={12}
//                         height={12}
//                         alt="check"
//                         className="bg-transparent"
//                       ></Image>
//                       <p className="bg-transparent"> {value.status}</p>
//                     </span>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="flex justify-center items-center gap-2 capitalize bg-[#1C2023] h-full">
//                     <Image
//                       src={
//                         Doctors.find((doc) => doc.name == value.doctor)?.image
//                       }
//                       width={32}
//                       height={32}
//                       alt="doctor"
//                       className="rounded-full"
//                     />
//                     {value.doctor}
//                   </div>
//                 </td>
//                 <td className=" ">
//                   <div className="flex justify-center gap-2 bg-[#1C2023] h-full">
//                     <button
//                       onClick={async () => {
//                         const result = await scheduleAppointment(value._id);
//                         setData(result);
//                       }}
//                       className="text-[#24AE7C] text-[14px] font-semibold"
//                     >
//                       Schedule
//                     </button>
//                     <button
//                       onClick={async () => {
//                         const response = await cancelAppointment(value._id);
//                         setData(response);
//                       }}
//                       className=" font-semibold text-[14px]"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           <tr className="mb-auto">
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td className="flex  justify-center items-end py-[16px] gap-4 h-full">
//               <button
//                 className="bg-[#0D0F10] px-[8px] rounded-[12px] text-[#24AE7C] font-semibold w-[70px] h-[32px] hover:scale-105 transition duration-300"
//                 disabled={startingIndex <= 0}
//                 onClick={() => handlePrevious()}
//               >
//                 Previous
//               </button>
//               <button
//                 className="bg-[#0D0F10] px-[8px] rounded-[12px] text-[#24AE7C] font-semibold w-[70px] h-[32px] hover:scale-105 transition duration-300"
//                 disabled={lastIndex >= data?.length}
//                 onClick={() => handleNext()}
//               >
//                 Next
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Admin;

function Admin() {
  return (
    <div className="w-[1280px] mx-auto py-7 flex flex-col gap-[20px]">
      <AdminHeader />
      {/* <section className="flex flex-col gap-2">
        <h1 className="text-[36px] font-bold text-white">Welcome, Admin</h1>
        <p className="text-[#ABB8C4] font-medium text-[16px]">
          Start your day with managing new appointment
        </p>
      </section> */}
      {/* <section className="flex justify-between">
        <StatCard />
        <StatCard />
        <StatCard />
      </section> */}
      <AdminTable />
    </div>
  );
}

export default Admin;
