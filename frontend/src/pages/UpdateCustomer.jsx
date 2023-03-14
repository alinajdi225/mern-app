import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomerUpdateForm from '../components/customerUpdateForm';
import Spinner from '../components/Spinner';
import { getCustomerById, reset } from '../features/customers/customersSlice';

function UpdateCustomer() {
  const id = useParams()['id'];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customer, isLoading, isError, message } = useSelector(
    (state) => state.customers,
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.log(message);
    }
    dispatch(getCustomerById(id));
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>{customer && <CustomerUpdateForm customer={customer} />}</>;
}

export default UpdateCustomer;
