"use server";

import connectDB from "../DatabaseConnect";
import patient from "../model/patients.model";

export async function createPatient(data, user) {
  await connectDB();
  try {
    const newPatient = await patient.create({ ...data, user });
    if (newPatient) return JSON.parse(JSON.stringify(newPatient));
  } catch (error) {
    console.log(error);
  }
}
