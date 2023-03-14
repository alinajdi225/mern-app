import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCustomer } from '../features/customers/customersSlice';

function CustomerUpdateForm({ customer }) {
  const [name, setName] = useState(customer.name);
  const [description, setDescription] = useState(customer.description);
  const [phone, setPhone] = useState(customer.phone);
  const id = customer._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.customers,
  );
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCustomer({ id, name, description, phone }));
    if (isSuccess) {
      navigate('/');
    }
    setName('');
    setDescription('');
    setPhone('');
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Name*</label>
          <input
            type="text"
            name="text"
            id="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="text">Description*</label>
          <input
            type="text"
            name="text"
            id="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="text">Phone</label>
          <input
            type="text"
            name="text"
            id="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Update Customer
          </button>
        </div>
      </form>
    </section>
  );
}

export default CustomerUpdateForm;
