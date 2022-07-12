import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  HospitalInfo,
  HospitalRegisterData,
  hospitalModel,
  HospitalModel,
} from '../db';

class HospitalService {
  constructor(private hospitalModel: HospitalModel) {}

  // 일반 회원가입
  async addUser(hospitalInfo: HospitalRegisterData): Promise<HospitalInfo> {
    // 객체 destructuring
    const {
      name,
      email,
      director,
      password,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    } = hospitalInfo;

    // 이메일 중복 확인
    const hospital = await this.hospitalModel.findByName(name);
    console.log(hospital);
    if (hospital) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newHospitalInfo: HospitalRegisterData = {
      name,
      email,
      director,
      password: hashedPassword,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    };

    // db에 저장
    const createdNewUser = await this.hospitalModel.create(newHospitalInfo);

    return createdNewUser;
  }
}

const hospitalService = new HospitalService(hospitalModel);

export { hospitalService };
