import mongoose, { model } from 'mongoose';
import { HospitalSchema } from '../schemas/HospSchema';

const Hospital = model('hospitals', HospitalSchema);

export interface Address {
  postalCode: string;
  address1: string;
  address2: string;
}

export interface addressCoordinate {
  x: string;
  y: string;
}

export interface HospitalRegisterData {
  name: string;
  email: string;
  director: string;
  password: string;
  address: Address;
  phoneNumber: string;
  businessNumber: string;
  licenseNumber: string;
}

export interface HospitalInfo {
  name: string;
  email: string;
  director: string;
  password: string;
  address: Address;
  addressCoordinate?: addressCoordinate;
  phoneNumber: string;
  businessHours?: number[];
  businessNumber: string;
  licenseNumber: string;
  holiday?: string[];
  hospitalCapacity?: number;
  tag?: object[];
  keyword?: string[];
  image?: string;
  refreshToken?: string;
  hospStatus?: object;
  hospRegStatus?: object;
  _id: mongoose.Types.ObjectId;
}

export class HospitalModel {
  async create(hospitalInfo: HospitalRegisterData): Promise<HospitalInfo> {
    const createdNewHospital = (await Hospital.create(
      hospitalInfo
    )) as HospitalInfo;
    return createdNewHospital;
  }

  async findByName(name: string): Promise<HospitalInfo> {
    const hospital = (await Hospital.findOne({ name })) as HospitalInfo;
    return hospital;
  }
}

const hospitalModel = new HospitalModel();

export { hospitalModel };
