const { request, response } = require("express");
const Customer = require('../model/customer.model');
const Category = require('../model/category.model');
const jwt = require = require('jsonwebtoken');

exports.signup = (request, response, next) => {

    const { customerName, customerEmail, customerPassword, customerNumber } = request.body

    Customer.create({
            customerName: customerName,
            customerEmail: customerEmail,
            customerNumber: customerNumber,
            customerPassword: customerPassword
        })
        .then(result => {
            console.log("result: ", result)
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log("Error: ", err)
            return response.status(500).json(err)
        });



};
exports.signin = (request, response, next) => {
    const { customerPassword, customerEmail } = request.body
    Customer.find({
            customerEmail: customerEmail,
            customerPassword: customerPassword
        })
        .then(result => {
            console.log(result);
            if (result) {
                let paylod = { subject: result._id };
                let token = jwt.sign(paylod, 'abcdefghijklm');
                return response.status(200).json({
                    status: 'login success',
                    current_user: result,
                    token: token
                })
            }
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: "Oops Something Went Wrong" });
        })
};



exports.deleteCategory = (request, response) => {
    Category.deleteOne({ _id: request.body.id })
        .then(result => {
            console.log(result)
            if (result.deletedCount)
                return response.status(202).json({ message: 'success' });
            else
                return response.status(204).json({ message: 'not deleted' });
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: 'Something went wrong' });
        });
}
exports.getCategory = (request, response) => {
    Category.find().
    then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever Error' });
        });
}
exports.update = (request, response, next) => {

    Category.updateOne({ _id: request.body.categoryId }, {
        $set: {
            categoryName: request.body.categoryName,
            categoryImageUrl: "https://nehatan.herokuapp.com/images/" + request.file.filename
        }
    }).then(result => {
        if (result.modifiedCount)
            return response.status(204).json({ message: 'success' });
        else
            return response.status(404).json({ message: 'record not found' })
    }).catch(err => {
        return response.status(500).json({ message: 'Something went wrong..' });
    });
}
exports.add = (request, response, next) => {
    console.log(request.body);
    console.log(request.file);
    Category.create({
            categoryName: request.body.categoryName,
            categoryImageUrl: "https://nehatan.herokuapp.com/images/" + request.file.filename
        })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(403).json({ message: "Oops! Something went wrong.." });
        });
}