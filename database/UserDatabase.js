const express = require('express');
const { default: mongoose, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("validator");
require('../connection/conn');

const userdata = new mongoose.Schema({
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
userdata.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    } next();
})
const user = new mongoose.model('userdata', userdata);

module.exports = user;