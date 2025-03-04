"use server";

import connectDB from "../DatabaseConnect";
import appointment from "../model/appointment.model";

export async function getSelectedAppointment(id, query) {
  await connectDB();

  try {
    const test = await appointment.findOneAndUpdate(
      { _id: id },
      { status: "scheduled" },
      { new: true }
    );

    console.log(test);

    const response = await appointment.find().populate("patient");
    const result = response.filter(
      (item) =>
        item.patient?.name?.toLowerCase().includes(query) ||
        item.patient?.email?.toLowerCase().includes(query) ||
        item.doctor?.toLowerCase().includes(query)
    );

    return JSON.parse(JSON.stringify(result));

    // const response = await appointment
    //   .find({
    //     doctor: new RegExp(`${input}`, "i"),
    //   })
    //   .populate("patient");
    // return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
}

export async function testPopulate(id, query) {
  await connectDB();
  try {
    await appointment.findOneAndUpdate({ _id: id }, { status: "cancelled" });

    const response = await appointment.find().populate("patient");
    const result = response.filter(
      (item) =>
        item.patient?.name?.toLowerCase().includes(query) ||
        item.patient?.email?.toLowerCase().includes(query) ||
        item.doctor?.toLowerCase().includes(query)
    );

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

export async function filterAppointmentByQuery(id, searchResult, status) {
  await connectDB();

  try {
    const test = await appointment.findOneAndUpdate({ _id: id }, { status });
    console.log(test);

    const response = await appointment.find().populate("patient");

    let arr = [];
    searchResult.map((item) => arr.push(item._id));

    const result = response.filter((item) => arr.includes(item._id.toString()));
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

export async function getAppointmentByFilterOptions(options) {
  await connectDB();

  try {
    const response = await appointment
      .find({ status: options })
      .populate("patient");
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
}
