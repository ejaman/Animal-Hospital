import { Schema } from 'mongoose';

const RezStatusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'regStatus',
    timestamps: true,
  }
);

export { RezStatusSchema };
