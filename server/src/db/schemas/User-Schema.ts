import {Schema} from 'mongoose';

const UserSchema = new Schema (
    {
        name : {
            type :String,
            required : true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
        
        phoneNumber : {
            type : Number,
            required : true,
        },  
        
        address: {
            type: new Schema(
            {
                postalCode: String,
                address1: String,
                address2: String,
            },
            {
                _id: false,
            }
            ),
            required: false,
        },
    
        pet : [{
            type : new Schema(
                {species : String,
                breed : String,
                name : String,
                age : Number,
                sex : String,
                weight : Number,
                medicalHistory : String,
                vaccination : String,
                neutralized : Boolean,
                image : String
            }

            ),
            required : true
        }],
        
        refreshtoken : {
            type : new Schema({
                kakao: String,
                base : String,
            }),
            required : false
        },

        
        isOAuth: {
            type: Boolean,
            required: false,
            default: false,
          },

        isAdminOk : {
            type : Boolean,
            required : false,
            default : false
        },
        
        userStatus : {
            type : String,
            required : true
        }
        
  
},

{
    collection : 'users',
    timestamps : true
}
        
   
    
);

export {UserSchema};