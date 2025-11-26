import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  grade?: string;
}

const EducationSchema: Schema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
  grade: { type: String },
}, { timestamps: true });

export default mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);
