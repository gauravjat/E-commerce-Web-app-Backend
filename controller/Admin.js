const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminDatabase = require('../database/AdminDatabase');
const categoriesDb = require('../database/Categories');
const subcategoriesDb = require('../database/Subcategories');
const cart = require('../database/CartDatabase');
const responseMessage = require('../response.json')
const Joi = require('joi');
const AppError = require('../util');

exports.adminSignup = async (req, res, next) => {
    const adminData = (req.body);
    try {
        const adminDetails = Joi.object({
            name: Joi.string().trim().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
            username: Joi.string().required(),
            password: Joi.string().required()
        })
        const validateAdinData = await adminDetails.validateAsync(adminData);
        const checkLocalData = await adminDatabase.findOne({ email: validateAdinData.email })

        if (checkLocalData != null) {
            throw new AppError("Data is already used", 409)
        }
        else {
            const admindata = new adminDatabase(validateAdinData)
            await admindata.save();
            res.status(200).json({ ProductId: admindata._id });
        }

    } catch (error) {
        next(error);
    }
}

exports.adminSignin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const adminmail = await adminDatabase.findOne({ email: email });
        if (!email || !password) {
            throw new AppError("Record not found!", 404);
        }
        else {
            if (adminmail == null) {
                res.status(200).json(responseMessage.ErrorCredentialEmail);
            }
            else {
                const isMatch = bcrypt.compare(password, adminmail.password);
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

exports.addData = async (req, res, next) => {
    const result = (req.body);
    try {
        const AdminDetails = Joi.object({
            categories: Joi.string().trim().required(),
            subcategories: Joi.string().required(),
            name: Joi.string().required(),
            price: Joi.number().required(),
            details: Joi.string().required(),
            color: Joi.string().required()
        })
        const value = await AdminDetails.validateAsync(result);
        const CheckLocalData = await categoriesDb.findOne({ email: value.email })
        const CheckCategorie = await subcategoriesDb.findOne({ categories: result.categories });
        const InsertData = subcategoriesDb(value);
        if (CheckCategorie == null) {
            await InsertData.save();
            res.status(200).json(responseMessage.AddSubcategoryData);
        }
        else {
            const CheckCategorie = await categoriesDb.findOne({ categories: result.categories });
            if (CheckCategorie == null) {
                const AddNewCategori = new categoriesDb({
                    categories: value.categories,
                    subcategories: value.subcategories
                })
                await AddNewCategori.save();
                res.status(200).json(responseMessage.AddCategoryData)

            }
            else {
                const CheckSubCategorie = await categoriesDb.findOne({ subcategories: result.subcategories });
                if (CheckSubCategorie == null) {
                    CheckCategorie.subcategories.push(result.subcategories);
                    CheckCategorie.save();
                    res.status(200).json(CheckCategorie._id)
                }
                else {
                    res.status(200).json(responseMessage.ErrorDuplicateData);
                }
            }
        }
    }
    catch (error) {
        next(error)
    }
}
exports.searchProduct = async (req, res) => {
    var regex = new RegExp(req.params.name, 'i');
    await subcategoriesDb.find({
        name: regex
    }).then((result) => {
        res.status(200).json(result);
    })
}
exports.sortProduct = async (req, res) => {
    try {
        const result = await subcategoriesDb.find().sort({ price: 1 })
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const getData = await subcategoriesDb.find();
        res.status(200).json(getData);
    } catch (error) {
        next(error)
    }

}

exports.countAllProduct = async (req, res) => {
    try {
        const getData = await subcategoriesDb.find().count();
        const getClothData = await subcategoriesDb.find({ categories: "Cloth" }).count();
        const getElectronicData = await subcategoriesDb.find({ categories: "Electronics" }).count();
        const getVehicleData = await subcategoriesDb.find({ categories: "vehicle" }).count();
        res.status(200).json({
            electronicProduct: getElectronicData,
            vehicleProduct: getVehicleData,
            clothProduct: getClothData,
            totalProduct: getData
        });
    } catch (error) {
        next(error)

    }
}
exports.updateProductData = async (req, res) => {
    try {
        const UpdatedProduct = await subcategoriesDb.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(UpdatedProduct);
    } catch (err) {
        next(error)
    }

}

exports.searchCartData = async (req, res) => {
    try {
        const userID = req.params;
        const findDataByUserId = await cart.findOne({ UserID: userID.userID });
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

exports.deleteData = async (req,res,next)=>{
    try {
        const deleteItem =await subcategoriesDb.findByIdAndDelete(req.params.id); 
        res.status(200).json({DeletedProduct:containData});
    } catch (error) {
        next(error);
    }
}

