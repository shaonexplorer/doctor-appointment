import patient from "./patients.model";
import DbUser from "./userModel";

const { default: mongoose } = require("mongoose");

const appointmentShema = new mongoose.Schema({
  doctor: String,
  reason: String,
  comments: String,
  date: Date,
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "scheduled", "cancelled"],
  },
  patient: { type: mongoose.SchemaTypes.ObjectId, ref: patient },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: DbUser },
});

const appointment =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentShema);

export default appointment;
