import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  issueDate: Date;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  description?: string;
}

const CertificateSchema: Schema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: Date, required: true },
  credentialId: { type: String },
  credentialUrl: { type: String },
  image: { type: String },
  description: { type: String },
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
