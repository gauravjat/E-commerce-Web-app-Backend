const express = require('express');
const { default: mongoose, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("validator");
const Joi = require('@hapi/joi');
require('../connection/conn');

const admindata = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
})
admindata.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    } next();
})
const admin = new mongoose.model('admindata', admindata);

module.exports = admin;