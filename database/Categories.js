const express = require('express');
const { default: mongoose, model } = require('mongoose');
require('../connection/conn');

const admindata = new mongoose.Schema({
    categories: {
        type: String,
        required: true
    },
    subcategories: {
        type: Array,
        required: true
    },
})

const admin = new mongoose.model('categoriesdata', admindata);

module.exports = admin;