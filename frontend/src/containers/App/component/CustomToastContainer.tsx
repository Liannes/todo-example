import { ToastContainer } from 'react-toastify';

const CustomToastContainer: React.FC = () => {
  return (
    <ToastContainer
      position="top-center"
      toastClassName="toast-item"
      autoClose={2000}
      newestOnTop={false}
      closeOnClick={false}
      limit={3}
    />
  );
};

export default CustomToastContainer;
