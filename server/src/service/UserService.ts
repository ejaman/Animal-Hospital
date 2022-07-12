import {userModel, UserModel, UserInfo, UserData} from '../db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginInfo {
    email : string,
    password : string
}

interface LoginResult {
    token : string;
    role : string,
    userStatus : string

}
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

    // 일반 로그인
    async getUserToken(loginInfo : LoginInfo) : Promise<LoginResult> {
        const {email, password} = loginInfo;

        const user = await this.userModel.findByEmail(email);

        if(!user){
            throw new Error(
                '해당 이메일의 가입 내역을 찾을 수 없습니다. 다시 한 번 확인해주세요.'
            )
        }

        const hashedPassword = user.password;
        const isPWCorrect = await bcrypt.compare(
            password,
            hashedPassword
        );

        if(!isPWCorrect){
            throw new Error(
                "비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요."
            )
        }

        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const token = jwt.sign({userId : user._id, role: user.role, userStatus : user.userStatus}, secretKey);

        const role  = user.role!;
        const userStatus = user.userStatus!;

        return {token, role, userStatus};



    }
}

const userService = new UserService(userModel);

export {userService};