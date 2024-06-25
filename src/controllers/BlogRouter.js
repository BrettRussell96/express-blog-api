const express = require('express');
const { BlogModel } = require('../models/BlogModel');
const { UserModel } = require('../models/UserModel');
const router = express.Router();

router.get("/", async (request, response, next) => {

    let result = await BlogModel.find({}).populate("author").exec();

    response.json({
        message: "Blog router homepage",
        result: result
    });
});

router.get("/findById/:id", async (request, response, next) => {

    let result = await BlogModel.findById(request.params.id).populate("author").exec();

    response.json({
        message: "Blog router homepage",
        result: result
    });
});


router.post("/findOneQuery", async (request, response, next) => {

    let result = await BlogModel.findOne(request.body).populate("author").exec();

    response.json({
        message: "Blog router homepage",
        result: result
    });
});

router.post("/findManyQuery", async (request, response, next) => {

    let result = await BlogModel.findOne(request.body).populate("author").exec();

    response.json({
        message: "Blog router homepage",
        result: result
    });
});

router.post("/", async (request, response, next) => {

    let result = await BlogModel.create(request.body).catch(error => {
        error.status = 400;
        return next(error)});
    
    if (result.errors){
        return next(result);
    }

    response.json({
        message: "Blog router homepage",
        result: result
    });
});


router.patch("/findById/:id", async (request, response, next) => {

    let result = await BlogModel.findByIdAndUpdate(
        request.params.id, 
        request.body,
        {
            returnDocument: "after"
        }
    );

    response.json({
        message: "Blog router homepage",
        result: result
    });
});


router.delete("/", async (request, response, next) => {

    let result = await BlogModel.findByIdAndDelete(request.body.id);

    response.json({
        message: "Blog router homepage"
    });
});


module.exports = router;