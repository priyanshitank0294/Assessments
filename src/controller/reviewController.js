const	express	=	require("express");

const reviewService = require("../service/reviewService");
const { default: mongoose, mongo } = require("mongoose");
const reviewController  =async	(req,	res)	=>	{
try	{
const	{	title,	comment,	rating,	reviewerName	}	=	req.body;
const {alreadyReviewed , review} = await  reviewService.createReviewService({	title,	comment,	rating,	reviewerName	});
if(alreadyReviewed){
    return res.send(" you already reviewed it..");}
res.send(review);
}	catch	(err)	{
console.log(err);
res.status(500).send("internal	server	error");
}
}

const getReviewsController = async	(req,	res)	=>	{
try	{
const	{	status,	page	=	1,	limit	=	10	}	=	req.query;
const reviews = await reviewService.getReviewsService(req.query);
res.send(reviews);
}	catch	(err)	{
res.status(500).send("error");
}
}

const getReviewsById = async (req,res)=>{
    try{
     const id = req.params.id;
     if(!mongoose.isValidObjectId(id)){
        return res.status(400).send("Invalid Id");
     }

     const review = await  reviewService.getReviewId(id);
 if(!review){
    return res.status(404).send("review not found..");
 }
 res.json(review);
    }
    catch(err){
console.log(err);
    }
}

const deleteReviews =  async (req,res)=>{
    try{
 const id = req.params.id;
 if(!mongoose.isValidObjectId(id)){
    return res.status(400).send("invalid id..");
 }
 const {reviewExist , reviewDelete} = await reviewService.deleteReviews(id);
 if(!reviewExist){
    return res.status(404).send("review not found");
 }

 res.status(200).send({
    success:true,
    message:"review deleted",
    reviewDelete
 });
    }
    catch(err){
        console.log(err);
    }
}

const updateReviews = async (req,res)=>{
    try{
 const id = req.params.id;
 if(!mongoose.isValidObjectId(id)){
    return res.status(400).send("invalid id.. ");
 }
 const  { reviewExist , updateProduct} = await reviewService.updateReviews(req.body,id);
 if(!reviewExist){
    return res.status(404).send("review not found");
 }
 res.status(200).send(updateProduct);
    }
    catch(err){
        console.log(err);
    }
}

const statusApprove = async (req,res)=>{
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).send("invalid Id .. ");
    }
    const review = await reviewService.statusApprove(id);
    if(!review){
        return res.status(404).send(" review not found");
    }

    res.send({
        message:"staus  set to approved",
        review,
    });

}
module.exports = {reviewController , getReviewsController , getReviewsById , deleteReviews , updateReviews , statusApprove};