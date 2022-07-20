import { RezStatusInfo, RezStatusModel, rezStatusModel } from '../db';

interface ToUpdate {
  rezStatusId: string;
  update: {
    [key: string]: string;
  };
}

class RezStatusService {
  constructor(private rezStatusModel: RezStatusModel) {}

  async findById(rezStatusId: string): Promise<RezStatusInfo> {
    const rezStatus = await this.rezStatusModel.findById(rezStatusId);
    if (!rezStatus) {
      throw new Error(
        '해당 예약 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return rezStatus;
  }

  async findAll() {
    const rezStatuses = await this.rezStatusModel.findAll();
    return rezStatuses;
  }

  async findByName(rezStatusName: string): Promise<RezStatusInfo> {
    const rezStatus = await this.rezStatusModel.findByName(rezStatusName);
    if (!rezStatus) {
      throw new Error(
        '해당 예약 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return rezStatus;
  }

  async create(rezStatusName: string): Promise<RezStatusInfo> {
    const isExist = await this.rezStatusModel.findByName(rezStatusName);
    if (isExist) {
      throw new Error(
        '이 이름으로 생성된 예약 상태코드가 있습니다. 다른 이름을 지어주세요.'
      );
    }
    const newRezStatus = await this.rezStatusModel.create(rezStatusName);
    return newRezStatus;
  }

  async update({ rezStatusId, update }: ToUpdate): Promise<RezStatusInfo> {
    const isExist = await this.rezStatusModel.findById(rezStatusId);
    if (!isExist) {
      throw new Error(
        '해당 예약 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const newRezStatus = await this.rezStatusModel.update({
      rezStatusId,
      update,
    });
    return newRezStatus;
  }

  async deleteById(rezStatusId: string): Promise<{ message: string }> {
    const isExist = await this.rezStatusModel.findById(rezStatusId);
    if (!isExist) {
      throw new Error(
        '해당 예약 상태코드 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }
    const { deletedCount } = await this.rezStatusModel.deleteById(rezStatusId);
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${isExist.name} 예약 상태코드 삭제를 실패하였습니다.`);
    }

    return {
      message: `${isExist.name} 예약 상태코드 삭제를 성공하였습니다.`,
    };
  }
}

const rezStatusService = new RezStatusService(rezStatusModel);

export { rezStatusService };
