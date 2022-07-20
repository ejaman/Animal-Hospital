import { Schema } from 'mongoose';

const ReservationSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
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
      ref: 'pets',
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
      default: '62d7b8a03b57514d19909adb',
    },
    message: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    collection: 'reservations',
    timestamps: true,
  }
);

export { ReservationSchema };
