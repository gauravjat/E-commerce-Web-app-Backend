const express = require('express');
const { default: mongoose, model } = require('mongoose');
require('../connection/conn');

const cartdata = new mongoose.Schema({
  UserID: {
    type: String,
    required: true
  },
  ProductID: {
    type: Array,
    required: true
  },
})

const CartData = new mongoose.model('cart', cartdata);

module.exports = CartData;