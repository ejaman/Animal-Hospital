import { PetData, PetInfo, petModel, PetModel, UserModel } from "../db";

class PetService {
    constructor(
        private petModel : PetModel,
        private userModel : UserModel) {}

    //펫 정보 등록
    async addPet(petInfo : PetInfo) : Promise<PetData>{
        const {species, breed, name, age, sex, weight,medicalHistory, vaccination, neutralized, image} = petInfo;
        
        const createdPet = await this.petModel.create(petInfo);
        return createdPet;

    }

    //펫 정보 수정


    //펫 정보 조회
    // 유저의 pet 필드 조회로?
    // asnyc getUserPetData ( userId : string) : Promise<UserPetData> {
    //     const user = await this.userModel.findById(userId);

    //     if(!user) {
    //         throw new Error("가입 내역이 없습니다. 이메일을 다시 확인해주세요.")
    //     }

    //     const pet = user.pet;
    // }

}