"use server";

import connectDB from "../DatabaseConnect";
import appointment from "../model/appointment.model";
import { getAppointment, getAppointmentById } from "./getAppointment";

export async function scheduleAppointment(id) {
  await connectDB();
  await getAppointmentById(id);

  const data = await getAppointment();
  return JSON.parse(JSON.stringify(data));
}

export async function cancelAppointment(id) {
  await connectDB();
  try {
    await appointment.findOneAndUpdate(
      { _id: id },
      { status: "cancelled" },
      { new: true }
    );
    const data = await getAppointment();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
