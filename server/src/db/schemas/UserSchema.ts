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
                {species : 
                    {
                        type : String,
                        required : true
                    },
                    
                breed : 
                    {
                        type : String,
                        required : true
                    }
                ,
                name : 
                    {
                        type : String,
                        required : true
                    },
                
                age :     
                    {
                        type : Number,
                        required : true
                    },

                sex :
                    {
                        type : String,
                        required : true
                    },
                
                
                weight :
                    {
                        type : Number,
                        required : true
                    }, 

                medicalHistory : 
                    {
                        type : String,
                        required : true
                    },

                vaccination :
                    {
                        type : String,
                        required : true
                    },
                
                neutralized : 
                    {
                        type : String,
                        required : false
                    },
                
                image : 
                    {
                        type : String,
                        required : false
                    },
            }

            ),
            required : false
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