"use server";

import connectDB from "../DatabaseConnect";
import appointment from "../model/appointment.model";

export async function createAppointment(data, user, patient) {
  await connectDB();

  const values = { ...data, user, patient };

  try {
    const newAppointment = await appointment.create(values);

    if (newAppointment) return JSON.parse(JSON.stringify(newAppointment));
  } catch (error) {
    console.log(error);
  }
}
