import mongoose from 'mongoose';

interface IObituaryLocation {
  venue: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface IObituaryDates {
  birthDate: Date;
  deathDate: Date;
  funeralDate?: Date;
  visitationDate?: Date;
}

interface IObituary {
  _id: mongoose.Types.ObjectId;
  title: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  featuredImage?: string;
  description: string;
  dates: IObituaryDates;
  funeralLocation?: IObituaryLocation;
  graveyardLocation?: IObituaryLocation;
  survivedBy?: string[];
  predeceased?: string[];
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new mongoose.Schema<IObituaryLocation>({
  venue: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const datesSchema = new mongoose.Schema<IObituaryDates>({
  birthDate: { type: Date, required: true },
  deathDate: { type: Date, required: true },
  funeralDate: { type: Date },
  visitationDate: { type: Date },
});

const obituarySchema = new mongoose.Schema<IObituary>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  maidenName: {
    type: String,
    trim: true,
  },
  featuredImage: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  dates: {
    type: datesSchema,
    required: true,
  },
  funeralLocation: locationSchema,
  graveyardLocation: locationSchema,
  survivedBy: [{ type: String, trim: true }],
  predeceased: [{ type: String, trim: true }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

obituarySchema.index({ firstName: 'text', lastName: 'text', title: 'text', description: 'text' });

export default mongoose.models.Obituary || mongoose.model<IObituary>('Obituary', obituarySchema);