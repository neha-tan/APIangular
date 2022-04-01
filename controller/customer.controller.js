const { request, response } = require("express");
const Customer = require('../model/customer.model');
const Category = require('../model/category.model');

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
                return response.status(201).json(result);
            else
                return response.status(404).json({ message: "User not found" })
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ message: "Oops Something Went Wrong" });
        })
};



exports.deleteCategory = (request, response) => {
    Category.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: 'success' });
            else
                return response.status(204).json({ message: 'not deleted' });
        })
        .catch(err => {
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
            categoryImageUrl: "http://localhost:3000/images/" + request.file.filename
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
            categoryImageUrl: "http://localhost:3000/images/" + request.file.filename
        })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(403).json({ message: "Oops! Something went wrong.." });
        });
}