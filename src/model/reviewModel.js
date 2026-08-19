const { required } = require("joi");
const mongoose = require("mongoose");

const reviewSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:[true , "title is missing"],
        maxLength:80,
        minLength:3,
        trim:true,
    },
    comment:{
        type:String,
        required:[true , "comment is missing"],
        maxLength:500,
        minLength:10,
        trim:true,
        validate:{
            validator: function(value){
                return value.trim().length>0;
            },
            message:"comment field can not return empty messages"
        }
    },
    rating:{
        type:Number,
        required:[true , "rating  is missing"],
        max:[5 , "rating must be at most 5"],
        min:[1 , "rating must be atleast 1"],
       validate:{
        validator:Number.isInteger,
        message:"rating should be between 1 to 5 and whole number"
       },
    },
    reviewerName:{
        type:String,
        required:[true , "reviewerName is missing"],
        maxLength:50,
        minLength:2,
        trim:true,
    },
    status:{
        type:String,
        enum:{values:["pending" , "approved" , "rejected"],
            message:"{VALUE}  IS NOT VALID STATUS"
        },
        default:"pending",
    },
    isVerifiedPurchase:{
        type:Boolean,
        default:false,
    },
    helpfulCount:{
        type:Number,
        min:[0,"helpfulCount cannot be negative"],
        default:0,
    },
} , {timestamps:true , strict:true ,  } );

const ReviewModel =  mongoose.model("Review" , reviewSchema );

module.exports = ReviewModel;