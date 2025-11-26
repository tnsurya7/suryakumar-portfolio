import mongoose, { Schema, Document } from 'mongoose';

export interface IInternship extends Document {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
}

const InternshipSchema: Schema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  technologies: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Internship || mongoose.model<IInternship>('Internship', InternshipSchema);
