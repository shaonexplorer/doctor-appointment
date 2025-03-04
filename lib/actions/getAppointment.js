"use server";

import connectDB from "../DatabaseConnect";
import appointment from "../model/appointment.model";

export async function getAppointment() {
  await connectDB();

  try {
    const data = await appointment.find().populate("patient");

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export async function getAppointmentById(id) {
  await connectDB();
  try {
    const data = await appointment.findOneAndUpdate(
      { _id: id },
      {
        status: "scheduled",
      }
    );
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleAppointment(id) {
  await connectDB();
  try {
    const data = await appointment.findOne({
      _id: id,
    });

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export async function getAppointmentByFilter(option) {
  await connectDB();

  try {
    const response = await appointment
      .find({ status: option })
      .populate("patient");

    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
}
