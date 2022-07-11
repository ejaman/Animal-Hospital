import {Schema} from 'mongoose';

const UserSchema = new Schema (
    {
        userName : {
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
            required: true,
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
                        required : false
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
        
        role : {
            type : String,
            required : true
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