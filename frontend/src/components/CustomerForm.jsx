import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from '../features/customers/customersSlice';

function CustomerForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createCustomer({ name, description, phone }));
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
            Add Customer
          </button>
        </div>
      </form>
    </section>
  );
}

export default CustomerForm;
