import mongoose, { model } from 'mongoose';
import { ReservationSchema } from '../schemas/RezSchema';

const Reservation = model('reservations', ReservationSchema);

export interface ToUpdateReservation {
  reservationId: string;
  update: {
    [key: string]: mongoose.Types.ObjectId;
  };
}

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

  async findById(reservationId: string): Promise<ReservationInfo> {
    const reservation = (await Reservation.findById(
      reservationId
    )) as ReservationInfo;
    return reservation;
  }

  async update({
    reservationId,
    update,
  }: ToUpdateReservation): Promise<ReservationInfo> {
    const filter = { _id: reservationId };
    const option = { returnOriginal: false };

    const updated = (await Reservation.findOneAndUpdate(
      filter,
      update,
      option
    )) as ReservationInfo;
    return updated;
  }

  async findbyNameAndDate(
    hospitalId: string,
    rezDate: string,
    rezHour: number
  ): Promise<ReservationInfo[]> {
    const filter = {
      hospital: hospitalId,
      rezDate: rezDate,
      rezHour: rezHour,
    };
    const reservations = (await Reservation.find(filter)) as ReservationInfo[];
    return reservations;
  }
}

const reservationModel = new ReservationModel();

export { reservationModel };
