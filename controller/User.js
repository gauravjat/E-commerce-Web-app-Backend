const EmailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const subcategoriesDb = require('../database/Subcategories');
const userDatabase = require('../database/UserDatabase');
const responseMessage = require('../response.json')
const cart = require('../database/CartDatabase');
const Joi = require('joi');
const AppError = require('../util');

exports.userSignup = async (req, res, next) => {
    const userdata = (req.body);
    try {
        const UserDetails = Joi.object({
            name: Joi.string().trim().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
            username: Joi.string().required(),
            password: Joi.string().required()
        })
        const value = await UserDetails.validateAsync(userdata);
        const checkLocalData = await userDatabase.findOne({ email: value.email })

        if (checkLocalData != null) {
            throw new AppError("Data is already used", 409)
        }
        else {
            const userData = new userDatabase(value)
            await userData.save();
            res.status(200).json({ UserID: userData._id });
        }
    } catch (error) {
        next(error)
    }
}

exports.userSignin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status.json(responseMessage.ErrorCredentialParameter);
        }
        else {
            const usernMail = await userDatabase.findOne({ email: email });
            if (usernMail == null) {
                res.status(200).json(responseMessage.ErrorCredentialEmail);
            }
            else {
                const isMatch = await bcrypt.compare(password, usernMail.password);
                if (isMatch) {
                    var token = jwt.sign({
                        email: email, password: password
                    }, 'admindata', {
                        expiresIn: "7d"
                    })
                    res.status(200).json({ token: token });

                }
                else {
                    res.status(200).json(responseMessage.ErrorCredentialParameter);
                }
            }
        }
    } catch (error) {
        next(error)
    }
}

exports.searchProduct = async (req, res) => {
    const { page, limit } = req.query;
    var regex = new RegExp(req.params.name, 'i');
    subcategoriesDb.find({
        name: regex
    }).limit(limit * 1).skip((page - 1) * limit)
        .then((result) => {
            res.status(200).json(result);
        })
}

exports.sortProduct = async (req, res, next) => {
    try {
        const result = await subcategoriesDb.find().sort({ price: 1 })
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

exports.userCart = async (req, res) => {
    const cartData = new cart({
        UserID: req.body.UserID,
        ProductID: req.body.ProductID
    })
    const getDataByUserID = await cart.findOne({ UserID: cartData.UserID })
    if (getDataByUserID == null) {
        await cartData.save();
        res.status(200).json({ ID: cartData._id });
    }

    else {
        const productData = await cart.findOne({ ProductID: cartData.ProductID });

        if (productData == null) {

            getDataByUserID.ProductID.push(cartData.ProductID[0]);
            getDataByUserID.save()
            res.status(200).json({ ProductId: getDataByUserID._id })
        }
        else {
            res.status(200).json(responseMessage.ErrorDuplicateData);
        }
    }
}

exports.searchCartData = async (req, res) => {
    try {
        const userID = req.params;
        const findDataByUserId = await cart.findOne({ UserID: userID.UserID });
        const ProductLength = findDataByUserId.ProductID.length;
        const containData = [];
        for (var i = 0; i < ProductLength; i++) {
            containData.push(await subcategoriesDb.findOne({ ProductID: findDataByUserId.ProductID[i] }));
        }
        res.status(200).json(containData);
    } catch (error) {
        next(error)
    }
}

