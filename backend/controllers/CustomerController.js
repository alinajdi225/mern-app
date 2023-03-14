const asyncHandler = require('express-async-handler');

const Customer = require('../models/customerModel');
const { numVerify } = require('../services/validatePhoneNumber');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();

  res.status(200).json(customers);
});

// @desc    Get customer by Id
// @route   GET /api/customer/:id
// @access  Private
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  res.status(200).json(customer);
});

// @desc    Add customer
// @route   POST /api/customers
// @access  Private
const addCustomer = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const phone = req.body.phone;
  console.log(req.body)
  if (!name || !description) {
    res.status(400);
    throw new Error('Please add the required fields');
  }
  let result = null;

  if (phone) {
    result = await numVerify.ValidateNumber(phone);
    if (result.valid == false) {
      res.status(400);
      throw new Error('phone number is not valid');
    }
  }

  const customer = await Customer.create({
    name: name,
    description: description,
    phone: phone,
    countryCode: result?.country?.code,
    countryName: result?.country?.name,
    operatorName: result?.carrier,
  });

  res.status(200).json(customer);
});

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);

  const name = req.body.name;
  const description = req.body.description;
  const phone = req.body.phone;
  let result = null;
  if (!customer) {
    res.status(400);
    throw new Error('Customer not found');
  }

  if (phone !== null) {
    result = await numVerify.ValidateNumber(phone);
    
    if (result.valid == false) {
      res.status(400);
      throw new Error('phone number is not valid');
    }
    
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      description: description,
      phone: phone,
      countryCode: result?.country?.code,
      countryName: result?.country?.name,
      operatorName: result?.carrier,
    },
    { returnOriginal: false },
  );
  res.status(200).json(updatedCustomer);
});

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private
const deletCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(400);
    throw new Error('Customer not found');
  }

  await customer.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deletCustomer,
};
