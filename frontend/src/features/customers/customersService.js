import axios from 'axios';

const API_URL = '/api/customers/';

// Create new customer
const createCustomer = async (customerData) => {
  const response = await axios.post(API_URL, customerData);

  return response.data;
};

// Update customer
const updateCustomer = async (id, customerData) => {
  const response = await axios.put(API_URL + id, customerData);
  return response.data;
};

// Get all customers
const getCustomers = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};
// get Customer By Id
const getCustomerById = async (customerId) => {
  const response = await axios.get(API_URL + customerId);

  return response.data;
};

// Delete customer
const deleteCustomer = async (customerId) => {
  const response = await axios.delete(API_URL + customerId);

  return response.data;
};

const customersService = {
  createCustomer,
  updateCustomer,
  getCustomers,
  getCustomerById,
  deleteCustomer,
};

export default customersService;
