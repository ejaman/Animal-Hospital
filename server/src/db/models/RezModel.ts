import mongoose, { model } from 'mongoose';
import { ReservationSchema } from '../schemas/RezSchema';

const Reservation = model('reservations', ReservationSchema);

interface SearchOptions {
  [key: string]: string | mongoose.Types.ObjectId;
}

export interface ReservationRegisterData {
  customer: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
  service: string;
  price: number;
  pet: mongoose.Types.ObjectId;
  rezDate: string;
  rezHour: number;
}

export interface ReservationInfo {
  _id: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
  service: string;
  price: number;
  pet: mongoose.Types.ObjectId;
  rezDate: string;
  rezHour: number;
  rezStatus: mongoose.Types.ObjectId;
  message: string;
}

export class ReservationModel {
  async create(
    rezRegisterData: ReservationRegisterData
  ): Promise<ReservationInfo> {
    const createdNewReservation = (await Reservation.create(
      rezRegisterData
    )) as ReservationInfo;
    return createdNewReservation;
  }

  async findList(
    page: number,
    perPage: number,
    searchOptions: SearchOptions
  ): Promise<ReservationInfo[]> {
    const reservations = (await Reservation.find(searchOptions)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)) as ReservationInfo[];
    return reservations;
  }

  async countReservations(searchOptions: SearchOptions): Promise<number> {
    const counts = await Reservation.countDocuments(searchOptions);
    return counts;
  }
}

const reservationModel = new ReservationModel();

export { reservationModel };
