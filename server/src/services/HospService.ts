import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  HospitalLoginResult,
  HospitalInfo,
  HospitalRegisterData,
  hospitalModel,
  HospitalModel,
} from '../db';
import { hospRegStatusService } from './index';

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
    const hospital = await this.hospitalModel.findByEmail(email);

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

  async getHospitalToken(
    email: string,
    password: string
  ): Promise<HospitalLoginResult> {
    // 이메일 db에 존재 여부 확인
    const hospital = await this.hospitalModel.findByEmail(email);

    if (!hospital) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 가입승인 확인
    const hospRegStatusId = hospital.hospRegStatus?.toString() as string;
    const hospRegStatus = await hospRegStatusService.findById(hospRegStatusId);
    const { name: hospRegStatusName } = hospRegStatus;
    if (hospRegStatusName !== '승인완료') {
      throw new Error(`${hospRegStatusName}`);
    }

    const hospitalEmail = hospital.email;
    const hospitalname = hospital.name;
    const correctPasswordHash = hospital.password;
    const hospitalId = hospital._id;
    const hospitalIdToString = hospitalId.toString();
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    const accessToken = jwt.sign(
      {
        hospitalEmail: hospitalEmail,
        hospitalname: hospitalname,
        hospitalId: hospitalIdToString,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign({}, secretKey, {
      expiresIn: '24h',
    });

    console.log(refreshToken);

    const updatedUser = await this.hospitalModel.updateRefreshToken({
      hospitalId,
      update: { refreshToken: refreshToken },
    });

    return { accessToken, hospitalname };
  }
}

const hospitalService = new HospitalService(hospitalModel);

export { hospitalService };
