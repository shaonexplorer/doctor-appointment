const { default: mongoose } = require("mongoose");

const patientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  allergies: String,
  birthday: Date,
  emergencyPerson: String,
  emergencyPhone: String,
  familyMedicalHistory: String,
  file: String,
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  idCat: String,
  idNum: String,
  insurancePolicyNumber: String,
  insuranceProvider: String,
  medication: String,
  occupation: String,
  pastMedicalHistory: String,
  physician: { type: String, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "DbUser" },
});

const patient =
  mongoose.models.patient || mongoose.model("patient", patientsSchema);

export default patient;
