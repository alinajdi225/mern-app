const express = require('express');
const router = express.Router();
const {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deletCustomer,
} = require('../controllers/CustomerController');

router.route('/').get(getCustomers).post(addCustomer);
router
  .route('/:id')
  .delete(deletCustomer)
  .put(updateCustomer)
  .get(getCustomerById);

module.exports = router;
