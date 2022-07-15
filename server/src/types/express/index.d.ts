declare namespace Express {
  export interface Request {
    currentUserId: string;
    currentHospId: string;
    userStatus:string;
  }
}
