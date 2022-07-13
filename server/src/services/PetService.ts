import { PetData, PetInfo, petModel, PetModel } from "../db";

interface PetOwner {
    owner : string
}
class PetService {
    constructor(
        private petModel : PetModel) {}

    //펫 정보 등록
    async addPet(petInfo : PetInfo) : Promise<PetData>{
        const {owner, species, breed, name, age, sex, weight,medicalHistory, vaccination, neutralized, image} = petInfo;
        
        const createdPet = await this.petModel.create(petInfo);
        return createdPet;

    }

    // //펫 정보 수정
    // async setPet(
    //     petOwner: PetOwner,
    //     toUpdate : Partial<PetInfo>
    //     ) : Promise<PetData> {

    //     try {
    //         const {owner} = petOwner;
    //         if (!owner){
    //             throw new Error("로그인한 펫 주인이 맞는지 확인해주세요.")
    //         }
    //     }
    //     }


    // 펫 정보 조회 
    async getUserPetData ( ownerId : string) : Promise<PetData[]> {

        const pets = await this.petModel.findById(ownerId);

        if(!ownerId) {
            throw new Error("가입 내역이 없습니다. 이메일을 다시 확인해주세요.")
        }

        if(!pets){
            throw new Error("조회되는 펫 정보가 없습니다.")
        }

        return pets;

        

    }

}


const petService = new PetService(petModel);

export {petService};