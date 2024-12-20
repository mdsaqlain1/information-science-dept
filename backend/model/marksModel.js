import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the student collection
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Reference to the courses collection
    required: true,
  },
  marks: {
    IA1: { type: Number },
    IA2: { type: Number },
    IA3: { type: Number },
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff", 
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Marks", MarksSchema);
