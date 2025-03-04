"use server";

import connectDB from "../DatabaseConnect";
import DbUser from "../model/userModel";

export default async function handle(data) {
  const { firstName, email, phone } = data;
  await connectDB();

  try {
    const existingUser = await DbUser.findOne({ email });

    if (existingUser) {
      // console.log(existingUser);

      throw new Error("user already exists");
    }

    const newUser = await DbUser.create({ name: firstName, email, phone });

    if (newUser) {
      return JSON.stringify(newUser);
    } else throw new Error("something went wrong");
  } catch (error) {
    console.log(error);
    return { error };
  }
}
