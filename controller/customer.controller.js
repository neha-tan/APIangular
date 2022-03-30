const { request, response } = require("express");
const Customer = require('../model/customer.model');

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
            if (result)
                return response.status(302).json(result);
            else
                return response.status(404).json({ message: "User not found" })
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: "Oops Something Went Wrong" });
        })
};