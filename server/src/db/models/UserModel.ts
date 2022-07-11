import {model} from 'mongoose';
import { UserSchema } from "../schemas/UserSchema";

const User = model('users', UserSchema);

// export type Role = 'basic-user' | 'hispital' | 'admin';

export interface UserAddress {
    postalCode?: string;
    address1?: string;
    address2?: string;
}

export interface UserInfo {
    userName : string,
    email : string,
    password : string,
    phoneNumber : string,
    address : UserAddress,
    role ? : string,
    userStatus ? : string
}

export interface UserData extends UserInfo{
    _id : string
}

export class UserModel {
    async findByEmail(email : string) : Promise<UserInfo | null> {
        const user = await User.findOne({email});
        return user;
    }

    async create(userInfo : UserInfo) : Promise<UserInfo> {
        const createdNewUser = await User.create(userInfo);
        return createdNewUser;
    }
}

const userModel = new UserModel();

export {userModel};