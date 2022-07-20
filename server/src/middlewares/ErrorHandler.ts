import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash'; 
// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.

export class HttpError extends Error {
  statusCode : number;
  constructor(statusCode : number = 500, message : string ) {
    super(message);
    this.statusCode = statusCode;

  }
}
function errorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);

  res.status(error.statusCode).json({ result: 'error', message: error.message });
}

function blockEmptyObject (obj : Object) : void {
  if(_.isEmpty(obj)){
    throw new HttpError(
      400,
      "body가 비어있거나 header의 Content-Type이 'application/json'인지 확인해주세요"
    )
  }
}
export { errorHandler, blockEmptyObject };
