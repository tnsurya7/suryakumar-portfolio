import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  level: number;
  icon?: string;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String },
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
