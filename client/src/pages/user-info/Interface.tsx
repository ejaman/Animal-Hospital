export interface UserInfoType {
  userName?: string;
  address?: {
    postalCode: string;
    address1: string;
    address2: string;
  };
  email?: string;
  password?: string;
  phoneNumber?: string;
}
export interface Address {
  postalCode?: string;
  address1?: string;
  address2?: string;
}

export interface Data {
  address: string;
  zonecode: string;
  roadAddress: string;
}
