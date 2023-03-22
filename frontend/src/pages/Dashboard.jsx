import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getCustomers, reset } from '../features/customers/customersSlice';
import CustomerItem from '../components/CustomerItem';
import CustomerForm from '../components/CustomerForm';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customers,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getCustomers());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome</h1>
        <p>Customers Dashboard</p>
      </section>

      <CustomerForm />

      <section className="content">
        {customers.length > 0 ? (
          <div className="customers">
            {customers.map((customer, index) => (
              <CustomerItem key={index} customer={customer} />
            ))}
          </div>
        ) : (
          <h3>You have not set any customers</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
