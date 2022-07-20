import { Schema } from 'mongoose';

const ReservationSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
      required: true,
    },
    rezDate: {
      type: String,
      required: true,
    },
    rezHour: {
      type: Number,
      required: true,
    },
    rezStatus: {
      type: Schema.Types.ObjectId,
      ref: 'rezStatus',
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'reservations',
    timestamps: true,
  }
);

export { ReservationSchema };
