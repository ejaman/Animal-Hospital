import {HttpError} from '../middlewares';
import * as _ from 'lodash';

function blockInvalidRequest (body : Object, requiredParams? :Array<string>) : void {

    //req.body가 비었거나 필수정보들이 있는지 체크
    //nullish | undefined 값이 들어올 경우 체크
    
    if(_.isEmpty(body) || requiredParams?.every(p => _.isNil(Object.keys(p)))){  
      throw new HttpError(
        400,
        "body에 필수정보가 모두 들어있는지 header의 Content-Type이 'application/json'인지 확인해주세요"
      )
    }

}

export {blockInvalidRequest};
