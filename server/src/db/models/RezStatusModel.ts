import mongoose, { model } from 'mongoose';
import { RezStatusSchema } from '../schemas/RezStatusSchema';

const RezStatus = model('rezStatus', RezStatusSchema);

export interface RezStatusInfo {
  _id?: mongoose.Types.ObjectId;
  name: string;
}

interface ToUpdate {
  rezStatusId: string;
  update: {
    [key: string]: string;
  };
}

export class RezStatusModel {
  async findAll() {
    const allHospRegStatus = await RezStatus.find({});
    return allHospRegStatus;
  }

  async findById(rezStatusId: string): Promise<RezStatusInfo> {
    const rezStatus = (await RezStatus.findById(rezStatusId)) as RezStatusInfo;
    return rezStatus;
  }

  async findByName(rezStatusName: string): Promise<RezStatusInfo> {
    const hospRegStatus = (await RezStatus.findOne({
      name: rezStatusName,
    })) as RezStatusInfo;
    return hospRegStatus;
  }

  async create(name: string) {
    const createdNew = await RezStatus.create({ name: name });
    return createdNew;
  }

  async update({ rezStatusId, update }: ToUpdate): Promise<RezStatusInfo> {
    const filter = { _id: rezStatusId };
    const option = { returnOriginal: false };

    const updated = (await RezStatus.findOneAndUpdate(
      filter,
      update,
      option
    )) as RezStatusInfo;
    return updated;
  }

  async deleteById(rezStatusId: string): Promise<{ deletedCount: number }> {
    const del = await RezStatus.deleteOne({ _id: rezStatusId });
    return del;
  }
}

const rezStatusModel = new RezStatusModel();

export { rezStatusModel };
