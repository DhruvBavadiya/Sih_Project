const mongoose = require("mongoose");

const pnrModel = new mongoose.Schema({

    pnrNumber:{
        type:Number,
        required:true
    },

    user:{
        mobileNumber:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    },

    bookingTime:{
        type:Date,
        default:Date.now
    },

    bus:{
        id:{
           type:String,
           required:true 
        },
        from:{
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        },
        arrivalTime:{
            type:Number,
            required:true
        },
        seatNumber:{
            type:Array,
            required:true
        }
    }

})

module.exports = mongoose.model("pnrModel", pnrModel);
