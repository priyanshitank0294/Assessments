const	express	=	require("express");
const	ReviewModel	=	require("../model");

const createReviewService = async (data)=>{
  try  {
    const {	title,	comment,	rating,	reviewerName	} = data;
    const	alreadyReviewed	=	await	ReviewModel.findOne({	reviewerName,	title	});
if	(alreadyReviewed)	{
return	null;
}
const	review	=	await	ReviewModel.create({
title,	comment,	rating,	reviewerName,
});
 return {alreadyReviewed , review}}
catch(err){
    console.log(err);
}
}

const getReviewsService = async (data)=>{
try{
    const {	status,	page	=	1,	limit	=	10	} = data;
const	filter	=	{};
if	(status)	filter.status	=	status;
const	reviews	=	await	ReviewModel.find(filter)
.skip((page	-	1)	*	limit)
.limit(limit);

return {reviews};
}
catch(err){
    console.log(err);
}
}

const getReviewId = async(id)=>{
    try{
     const review = await ReviewModel.findById(id);

     if(!review){
        return null;
     }

     return {review};
    }
    catch(err){
        console.log(err);
    }
}

const deleteReviews = async (id) =>{
    try{
   const reviewExist = await ReviewModel.findById(id);
   if(!reviewExist){
    return null;
    throw new Error("review not exist");
   }
   const reviewDelete = await ReviewModel.findByIdAndDelete(id);

   return {reviewExist , reviewDelete} ;

    }
    catch(err){
        console.log(err);
    }
}
const updateReviews = async (data , id)=>{
    try{
       const  reviewExist = await ReviewModel.findById(id);
       if(!reviewExist){
        return null;
       }
       const updateProduct = await ReviewModel.findByIdAndUpdate(id , data,{
        returnDocument:"after",
        runValidators:true,
       });
       return { reviewExist , updateProduct};

    }
    catch(err){
console.log(err);
    }
}

const statusApprove = async (id)=>{
try{
 const review = await ReviewModel.findById(id);
 if(!review){
    return null;
 }
 if(review.status === "approved"){
     throw new Error("status is already approved");
 }
 review.status = "approved";
 await review.save();
 return {review};
}
catch(err){
    console.log(err);
}
}
module.exports = {createReviewService , getReviewsService , getReviewId , deleteReviews , updateReviews , statusApprove};