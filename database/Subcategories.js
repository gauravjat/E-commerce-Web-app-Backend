const express = require('express');
const { default: mongoose, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("validator");
require('../connection/conn');

const admindata = new mongoose.Schema({
    categories: {
        type: String,
        required: true
    },
    subcategories: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }

})

const admin = new mongoose.model('subcategoriesdata', admindata);

module.exports = admin;