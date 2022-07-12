import {userModel, UserModel, UserInfo} from '../db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class UserService {
    constructor(private userModel : UserModel) {}

    //일반회원가입
    async addUser(userInfo : UserInfo) : Promise<UserInfo> {
        const {userName, email, password, phoneNumber,address, role, userStatus} = userInfo;
        const user = await this.userModel.findByEmail(email);

        // 이메일 중복 확인
        if (user) {
            throw new Error(
                '현재 이 이메일은 사용 중입니다. 다른 이메일을 입력해 주세요.'
            )
        }

        //비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserInfo = {userName, email, password : hashedPassword, phoneNumber,address, role, userStatus};

        // db에 저장
        const createdNewUser = await this.userModel.create(newUserInfo);
        return createdNewUser;
    }
}

const userService = new UserService(userModel);

export {userService};