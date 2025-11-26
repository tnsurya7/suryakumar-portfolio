import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges?: string;
  image: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  features: [{ type: String }],
  challenges: { type: String },
  image: { type: String, required: true },
  images: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
