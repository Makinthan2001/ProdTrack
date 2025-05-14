import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const ProductList = () => {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default ProductList;
