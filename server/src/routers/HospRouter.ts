import { Router } from 'express';
import * as _ from 'lodash';
import { hospitalService } from '../services';
import {} from '../middlewares';

const hospitalRouter = Router();

hospitalRouter.post('/register', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // req (request) 에서 데이터 가져오기
    interface address {
      postalCode: string;
      address1: string;
      address2: string;
    }

    interface user {
      name: string;
      email: string;
      director: string;
      password: string;
      address: address;
      phoneNumber: string;
      businessNumber: string;
      licenseNumber: string;
    }

    const {
      name,
      email,
      director,
      password,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    }: user = req.body;

    if (
      !name ||
      !email ||
      !director ||
      !password ||
      !address ||
      !phoneNumber ||
      !businessNumber ||
      !licenseNumber
    ) {
      throw new Error('필수 항목이 빠졌습니다. 다시 확인해주세요.');
    }

    // 이메일 폼 검증
    let regexEmail =
      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }

    //패스워드 폼 검증
    let regexPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    if (!regexPassword.test(password)) {
      throw new Error('비밀번호 형식이 올바르지 않습니다.');
    }

    // //이메일 인증 로직
    // let serverAuthNumber: string = '0';
    // const AuthEmailIdentifier = req.cookies['AuthEmailIdentifier'];
    // console.log('req.cookies', AuthEmailIdentifier);
    // if (!AuthEmailIdentifier) {
    //   throw new Error('이메일 인증을 다시 시작하세요');
    // }
    // const redisData = await redisClient.HGETALL(AuthEmailIdentifier);
    // console.log(redisData);
    // console.log(redisData.authNumber);
    // console.log(typeof redisData.authNumber);

    // if (typeof redisData.authNumber == 'undefined') {
    //   const flag: string = 'email';
    //   const toFindAuthNumber = {
    //     email: email,
    //     flag: flag,
    //     identifierNumber: AuthEmailIdentifier,
    //   };
    //   const dbSave = await authNumberService.findAuthNumber(toFindAuthNumber);
    //   if (!dbSave) {
    //     throw new Error(
    //       '인증 시간이 지났습니다. 이메일 인증을 다시 시작하세요'
    //     );
    //   }
    //   serverAuthNumber = dbSave.authNumber;
    // } else {
    //   serverAuthNumber = redisData.authNumber;
    // }

    // if (emailAuthNumber !== serverAuthNumber) {
    //   throw new Error('인증번호가 틀립니다. 다시 입력해주세요');
    // }

    // // 위 데이터를 유저 db에 추가하기
    const hospitalInfo: user = {
      name,
      email,
      director,
      password,
      address,
      phoneNumber,
      businessNumber,
      licenseNumber,
    };

    const newHospital = await hospitalService.addUser(hospitalInfo);

    res
      .status(201)
      .json({
        message: '병원가입 내역 확인중입니다.',
        data: { hospital: newHospital },
      });
  } catch (error) {
    next(error);
  }
});

hospitalRouter.post('/login', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (_.isEmpty(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { email, password } = req.body;

    // 위 데이터가 db에 있는지 확인하고,
    // db 있을 시 로그인 성공 및, 토큰 받아오기
    const hospitalToken = await hospitalService.getHospitalToken(
      email,
      password
    );

    const { accessToken, hospitalname } = hospitalToken;

    res.cookie('user', accessToken, {
      httpOnly: true,
    });

    res.status(201).json({
      data: { hospitalName: hospitalname },
      message: '로그인에 성공했습니다!',
    });
  } catch (error) {
    next(error);
  }
});

export { hospitalRouter };
