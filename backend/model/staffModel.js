import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  role: { type: String, default: "staff" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Courses assigned to this staff member
});

export default mongoose.model("Staff", staffSchema);